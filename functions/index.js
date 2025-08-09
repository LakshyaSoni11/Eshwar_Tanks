const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Load from Firebase environment config with fallbacks
const gmailEmail = functions.config().gmail?.email;
const gmailPassword = functions.config().gmail?.password;

// Validate environment variables
if (!gmailEmail || !gmailPassword) {
  console.error("❌ Gmail credentials not found. Please set them using:");
  console.error("firebase functions:config:set gmail.email='your-email' gmail.password='your-app-password'");
}

const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Nodemailer configuration error:", error);
  } else {
    console.log("✅ Nodemailer is ready to send emails");
  }
});

exports.sendContactEmail = functions.firestore
  .document("ContactMessages/{messageId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const messageId = context.params.messageId;

    console.log("📧 Function triggered for document:", messageId);
    console.log("📧 New contact message received:", {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      message: data.message?.substring(0, 50) + "..." // Log only first 50 chars of message
    });

    // Validate required fields
    if (!data.fullName || !data.email || !data.message) {
      console.error("❌ Missing required fields in document");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.error("❌ Invalid email format:", data.email);
      return;
    }

    const adminMailOptions = {
      from: `"Eshwar Tanks Contact Form" <${gmailEmail}>`,
      to: gmailEmail,
      subject: `🔔 New Contact Form Submission from ${data.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #005595;">New Contact Form Submission</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${data.fullName}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-left: 4px solid #005595; margin: 10px 0;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
            <p><strong>Received at:</strong> ${data.createdAt ? data.createdAt.toDate() : new Date()}</p>
            <p><strong>Document ID:</strong> ${messageId}</p>
          </div>
        </div>
      `,
    };

    const userMailOptions = {
      from: `"Eshwar Tanks" <${gmailEmail}>`,
      to: data.email,
      subject: "✅ We received your message - Eshwar Tanks",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #005595; color: white; padding: 20px; text-align: center;">
            <h2>Thank you for contacting Eshwar Tanks!</h2>
          </div>
          <div style="padding: 20px;">
            <p>Hi ${data.fullName},</p>
            <p>Thank you for reaching out to us! We have successfully received your message and our team will review it shortly.</p>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4>Your message:</h4>
              <p style="font-style: italic;">"${data.message}"</p>
            </div>
            
            <p>We typically respond within 24-48 hours during business days. If you need immediate assistance, please call us at <strong>+91 88257 04318</strong>.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p>Best regards,<br>
              <strong>Eshwar Tanks Team</strong><br>
              Email: admin@eshwartanks.com<br>
              Phone: +91 88257 04318</p>
            </div>
          </div>
        </div>
      `,
    };

    try {
      // Send admin notification email
      await transporter.sendMail(adminMailOptions);
      console.log("✅ Admin notification email sent successfully");

      // Send user confirmation email
      await transporter.sendMail(userMailOptions);
      console.log("✅ User confirmation email sent successfully");

      // Update document to mark as processed
      await admin.firestore().collection('ContactMessages').doc(messageId).update({
        emailSent: true,
        emailSentAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log("✅ Document updated with email status");

    } catch (error) {
      console.error("❌ Error sending emails:", error);
      
      // Update document to mark as failed
      try {
        await admin.firestore().collection('ContactMessages').doc(messageId).update({
          emailSent: false,
          emailError: error.message,
          emailErrorAt: admin.firestore.FieldValue.serverTimestamp()
        });
      } catch (updateError) {
        console.error("❌ Error updating document:", updateError);
      }
      
      // Don't throw error to prevent function retries
      // throw new functions.https.HttpsError("internal", "Unable to send email");
    }
  });