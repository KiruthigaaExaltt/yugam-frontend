import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useState } from "react";
import { FiLock } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "./authApi";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

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

    const [resetPassword, { isLoading: isSubmitting }] = useResetPasswordMutation();

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

        if (!token) {
            toast.error("Invalid or missing reset token");
            return;
        }

        try {
            const result = await resetPassword({
                resetToken: token,
                newPassword: password,
            }).unwrap();

            if (result.success) {
                toast.success("Password reset successful! Redirecting to login...");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                toast.error(result.message || "Failed to reset password");
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Password reset failed");
        }
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


                    {/* FORM */}
                    <div className="space-y-4">
                        <div className="w-full">
                            <Password
                                id="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                                }}
                                toggleMask
                                feedback={false}
                                placeholder="New Password"
                                className={`w-full transition-all duration-300 ${errors.password ? "border-red-500 focus:ring-red-500/20" : ""}`}
                                inputClassName="w-full"
                                disabled={isSubmitting || !!errors.token}
                                pt={{
                                    input: { className: `w-full ${errors.password ? "border-red-500 text-red-500" : ""}` }
                                }}
                            />
                            {errors.password && (
                                <div className="animate-error text-red-500 text-xs font-medium mt-1.5 px-1">
                                    <span>{errors.password}</span>
                                </div>
                            )}
                        </div>

                        <div className="w-full">
                            <Password
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: undefined }));
                                }}
                                toggleMask
                                feedback={false}
                                placeholder="Confirm Password"
                                className={`w-full transition-all duration-300 ${errors.confirmPassword ? "border-red-500 focus:ring-red-500/20" : ""}`}
                                inputClassName="w-full"
                                disabled={isSubmitting || !!errors.token}
                                pt={{
                                    input: { className: `w-full ${errors.confirmPassword ? "border-red-500 text-red-500" : ""}` }
                                }}
                            />
                            {errors.confirmPassword && (
                                <div className="animate-error text-red-500 text-xs font-medium mt-1.5 px-1">
                                    <span>{errors.confirmPassword}</span>
                                </div>
                            )}
                        </div>

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
