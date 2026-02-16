import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useState } from "react";
import { FiLock } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<{
        password?: string;
        confirmPassword?: string;
        token?: string;
    }>({});
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors: typeof errors = {};

        if (!token) {
            newErrors.token = "Invalid or missing reset token";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
            newErrors.password =
                "Password must contain uppercase, lowercase, number, and special character";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
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
            setSuccessMessage("Password reset successful! Redirecting to login...");
            setIsSubmitting(false);

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate("/login");
            }, 2000);
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

                <h1 className="text-5xl font-bold mb-4">Create New Password</h1>
                <p className="text-lg text-white/90 max-w-lg mb-8">
                    Choose a strong password to secure your account and protect your data.
                </p>

                <ul className="space-y-3 text-white/90">
                    <li>• Minimum 8 characters</li>
                    <li>• Include uppercase and lowercase</li>
                    <li>• Add numbers and special characters</li>
                </ul>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex flex-1 items-center justify-center px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                            <FiLock size={24} />
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold text-center mb-1">
                        Reset Password
                    </h2>
                    <p className="text-sm text-gray-500 text-center mb-6">
                        Enter your new password below
                    </p>

                    {errors.token && (
                        <Message
                            severity="error"
                            text={errors.token}
                            className="mb-4 w-full"
                        />
                    )}

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
                            <Password
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                toggleMask
                                className={`w-full ${errors.password ? "p-invalid" : ""}`}
                                inputClassName="w-full"
                                disabled={isSubmitting || !!errors.token}
                            />
                            <label htmlFor="password">New Password</label>
                        </span>
                        {errors.password && (
                            <small className="p-error">{errors.password}</small>
                        )}

                        <span className="p-float-label w-full">
                            <Password
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                toggleMask
                                feedback={false}
                                className={`w-full ${errors.confirmPassword ? "p-invalid" : ""}`}
                                inputClassName="w-full"
                                disabled={isSubmitting || !!errors.token}
                            />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                        </span>
                        {errors.confirmPassword && (
                            <small className="p-error">{errors.confirmPassword}</small>
                        )}

                        <Button
                            label={isSubmitting ? "Resetting..." : "Reset Password"}
                            onClick={handleSubmit}
                            disabled={isSubmitting || !!errors.token}
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

export default ResetPassword;
