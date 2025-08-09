import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, Phone, Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import { signOut, updateProfile, sendEmailVerification } from "firebase/auth";

export default function RegistrationFlow() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [seePassword, setSeePassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // 1️⃣ Create user
            const userCredential = await doCreateUserWithEmailAndPassword(email, password);
            const createdUser = userCredential.user;

            // 2️⃣ Update displayName in Firebase Auth
            await updateProfile(createdUser, { displayName: firstName.trim() });

            // 3️⃣ Save user data in Firestore
            await setDoc(doc(db, "users", createdUser.uid), {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                phone: phone.trim(),
                email: createdUser.email,
                displayName: firstName.trim(),
            });

            // 4️⃣ Send verification email
            await sendEmailVerification(createdUser);
            toast.success("Account created! Check your email for the verification link before logging in.");

            // 5️⃣ Sign out so they must verify before logging in
            await signOut(auth);

            // 6️⃣ Stay on same page or navigate to login
            navigate("/login");
        } catch (err) {
            toast.error(err?.message || "Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleViewPassword = () => {
        setSeePassword((prev) => !prev);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
                <p className="text-center text-gray-500 mb-8">
                    Join us to get started with smart water management.
                </p>
                <form onSubmit={handleRegister} className="space-y-6">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="relative">
                        <input
                            type={seePassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
                            onClick={handleViewPassword}
                        >
                            {seePassword ? <Eye /> : <EyeClosed />}
                        </span>
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#005595] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#004477] disabled:bg-gray-400"
                    >
                        {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                        Register
                    </button>
                </form>
                <p className="text-center text-sm mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
