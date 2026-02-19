import { InputOtp } from "primereact/inputotp";
import { Button } from "primereact/button";
import { useState } from "react";
import { FiShield } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useVerifyOTPTokenMutation } from "./authApi";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "your email";

    console.log("Email for OTP verification:", email);


    const [verifyOTPToken, { isLoading }] = useVerifyOTPTokenMutation();

    const [otp, setOtp] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        console.log("Submit clicked, OTP:", otp, "Length:", otp?.toString().length);

        if (!otp || otp.toString().length !== 6) {
            setError("Please enter the complete 6-digit code");
            return;
        }
        setError(null);

        try {
            console.log("Calling verifyOTPToken with:", { email, otp: otp.toString() });
            const result = await verifyOTPToken({
                email,
                otp: otp.toString(),
            }).unwrap();

            console.log("verifyOTP response:", result);

            if (result.success) {
                toast.success("OTP verified successfully!");
                const resetToken = result.data.resetToken;
                navigate(`/reset-password?token=${resetToken}`);
            } else {
                toast.error(result.message || "Invalid OTP");
            }
        } catch (err: any) {
            console.error("verifyOTP error:", err);
            toast.error(err?.data?.error?.message || "OTP verification failed");
        }
    };


    const handleResend = () => {
        // limit resend logic could go here
        toast.success("Code resent successfully!");
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

                <h1 className="text-5xl font-bold mb-4">Verify Your Identity</h1>
                <p className="text-lg text-white/90 max-w-lg mb-8">
                    We've sent a 6-digit verification code to your email. Please enter it to proceed.
                </p>

                <ul className="space-y-3 text-white/90">
                    <li>• Check your inbox and spam folder</li>
                    <li>• Code expires in 10 minutes</li>
                    <li>• Secure modification process</li>
                </ul>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex flex-1 items-center justify-center px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                            <FiShield size={24} />
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold text-center mb-1">
                        Enter Verification Code
                    </h2>
                    <p className="text-sm text-gray-500 text-center mb-6">
                        Sent to {email}
                    </p>


                    <div className="flex flex-col items-center space-y-6">
                        <div className="flex flex-col items-center">
                            <InputOtp
                                value={otp}
                                onChange={(e) => {
                                    setOtp(e.value?.toString() ?? "");
                                    if (error) setError(null);
                                }}
                                length={6}
                                disabled={isLoading}
                                className={error ? "p-invalid" : ""}
                            />
                            {error && (
                                <div className="animate-error p-error-premium">
                                    <AlertCircle size={14} />
                                    <span>{error}</span>
                                </div>
                            )}
                        </div>

                        <Button
                            label={isLoading ? "Verifying..." : "Verify Code"}
                            onClick={handleSubmit}
                            disabled={isLoading || !otp || otp.toString().length !== 6}
                            className="w-full p-button-lg bg-linear-to-r from-blue-600 to-sky-500 border-none"
                        />

                        <div className="text-center mt-2">
                            <p className="text-sm text-gray-600">
                                Didn't receive the code?{" "}
                                <button
                                    onClick={handleResend}
                                    className="text-blue-500 hover:underline font-medium"
                                    disabled={isLoading}
                                >
                                    Resend
                                </button>
                            </p>
                        </div>

                        <div className="text-center mt-2">
                            <button
                                onClick={() => navigate("/login")}
                                className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
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

export default VerifyOtp;
