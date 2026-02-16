import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<{ email?: string }>({});
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors: typeof errors = {};

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Enter a valid email address";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setIsSubmitting(true);
        setSuccessMessage("");

        // Simulate API call
        setTimeout(() => {
            setSuccessMessage(
                "If an account exists with this email, you will receive a password reset link shortly."
            );
            setIsSubmitting(false);
            setEmail("");

            // Redirect to login after 3 seconds
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex bg-linear-to-br from-blue-600 via-sky-400 to-teal-400">
            {/* LEFT SECTION */}
            <div className="hidden lg:flex flex-1 flex-col justify-center px-20 text-white">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                        <span className="font-bold text-lg">E</span>
                    </div>
                    <span className="text-xl font-semibold">Exaltt.ai</span>
                </div>

                <h1 className="text-5xl font-bold mb-4">Reset Your Password</h1>
                <p className="text-lg text-white/90 max-w-lg mb-8">
                    Enter your email address and we'll send you instructions to reset your
                    password.
                </p>

                <ul className="space-y-3 text-white/90">
                    <li>• Secure password recovery</li>
                    <li>• Quick and easy process</li>
                    <li>• 24/7 support available</li>
                </ul>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex flex-1 items-center justify-center px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                            <FiMail size={24} />
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold text-center mb-1">
                        Forgot Password?
                    </h2>
                    <p className="text-sm text-gray-500 text-center mb-6">
                        No worries, we'll send you reset instructions
                    </p>

                    {successMessage && (
                        <Message
                            severity="success"
                            text={successMessage}
                            className="mb-4 w-full"
                        />
                    )}

                    {/* FORM */}
                    <div className="space-y-4">
                        <span className="p-float-label w-full">
                            <InputText
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full ${errors.email ? "p-invalid" : ""}`}
                                disabled={isSubmitting}
                            />
                            <label htmlFor="email">Email Address</label>
                        </span>
                        {errors.email && <small className="p-error">{errors.email}</small>}

                        <Button
                            label={isSubmitting ? "Sending..." : "Send Reset Link"}
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full p-button-lg bg-linear-to-r from-blue-600 to-sky-500 border-none"
                        />

                        <div className="text-center mt-4">
                            <button
                                onClick={() => navigate("/login")}
                                className="text-sm text-blue-500 hover:underline"
                            >
                                ← Back to Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
