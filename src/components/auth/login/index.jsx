import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, Eye, EyeClosed } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../../../firebase/auth";
import { auth, db } from "../../../firebase/firebase"; // Make sure this points to your Firebase config
import { sendEmailVerification, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [seePassword, setSeePassword] = useState(false);
    const navigate = useNavigate();

    const handleEmailPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    setErrorMessage("");

    try {
        const loggedInUser = await doSignInWithEmailAndPassword(email, password);
        const userCredential = loggedInUser.user;
        if (!userCredential.emailVerified) {
            // Send verification email
            await sendEmailVerification(loggedInUser);
            toast.info("Verification email sent. Please check your inbox.");
            toast.error("Your email is not verified yet.");
            
            // Sign them out so they can verify first
            await signOut(auth);
            return; // Stay on login page
        }

        // If verified, proceed
        toast.success("Signed in successfully.");
        navigate("/");
    } catch (err) {
        setErrorMessage("Sign-in failed. Check your credentials again");
        toast.error(err?.message || "Sign-in failed.");
    } finally {
        setIsSigningIn(false);
    }
};




    const handleGoogleSignIn = async () => {
        setIsSigningIn(true);
        setErrorMessage("");

        try {
            await doSignInWithGoogle();
            toast.success("Signed in with Google.");
            navigate("/");
        } catch (err) {
            setErrorMessage(err?.message || "Google sign-in failed.");
            toast.error(err?.message || "Google sign-in failed.");
        } finally {
            setIsSigningIn(false);
        }
    };

    const handleViewPassword = () => {
        setSeePassword((prev) => !prev);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md p-8 sm:p-10 bg-white rounded-2xl shadow-2xl border border-gray-200 animate-fade-in">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-2">
                    Welcome Back!
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    Sign in to access your orders.
                </p>

                {errorMessage && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center mb-6">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleEmailPasswordSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full px-5 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <input
                            type={seePassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full px-5 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
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
                        disabled={isSigningIn}
                        className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all duration-300 ${isSigningIn ? 'bg-blue-300 cursor-not-allowed' : 'bg-[#005595] hover:bg-[#004477]'
                            }`}
                    >
                        {isSigningIn && <Loader2 className="w-5 h-5 animate-spin" />}
                        Sign In
                    </button>
                </form>

                <div className="my-8 flex items-center justify-center">
                    <span className="text-sm text-gray-400">or</span>
                </div>

                <button
                    onClick={handleGoogleSignIn}
                    disabled={isSigningIn}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-gray-700 border border-gray-300 bg-white shadow-sm transition-all duration-300 ${isSigningIn ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-50 hover:shadow-md'
                        }`}
                >
                    <FaGoogle className="w-5 h-5" />
                    Sign in with Google
                </button>

                <div className="mt-8 text-center text-sm">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/register" className="ml-2 font-semibold text-blue-600 hover:text-blue-800">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
