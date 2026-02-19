
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { useLoginMutation } from "./authApi";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    auth?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
      newErrors.password = "Password must contain uppercase, lowercase, number, and special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const result = await login({
        email,
        password,
      }).unwrap();

      // ✅ Check success from backend
      if (result.success) {
        toast.success("Login successful!");
        // Store token
        localStorage.setItem("token", result.data.token);

        // Store full user data
        localStorage.setItem("user", JSON.stringify(result.data));

        if (remember) {
          localStorage.setItem("remember", "true");
        }

        // ✅ Navigate only if success
        navigate("/dashboard");
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid email or password");
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

        <h1 className="text-5xl font-bold mb-4">Welcome Back</h1>
        <p className="text-lg text-white/90 max-w-lg mb-8">
          Access your comprehensive business management platform and take
          control of your operations.
        </p>

        <ul className="space-y-3 text-white/90">
          <li>• 24 integrated business modules</li>
          <li>• Enterprise-grade security</li>
          <li>• Real-time analytics and insights</li>
        </ul>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center text-white">
              <FiLogIn size={24} />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center mb-1">Sign In</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter your credentials to access your dashboard
          </p>


          <div className="space-y-4">
            <div className="w-full">
              <InputText
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                }}
                placeholder="Email Address"
                className={`w-full transition-all duration-300 ${errors.email ? "input-error-state" : ""}`}
              />
              {errors.email && (
                <div className="animate-error p-error-premium">
                  <AlertCircle size={14} />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

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
                placeholder="Password"
                className={`w-full transition-all duration-300 ${errors.password ? "input-error-state" : ""}`}
                inputClassName="w-full"
                pt={{
                  root: { className: "w-full" },
                  input: { className: "w-full" }
                }}
              />
              {errors.password && (
                <div className="animate-error p-error-premium">
                  <AlertCircle size={14} />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Checkbox
                  inputId="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.checked ?? false)}
                />
                <label htmlFor="remember">Remember me</label>
              </div>

              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-blue-500 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <Button
              label={isLoading ? "Signing In..." : "Sign In"}
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full p-button-lg bg-linear-to-r from-blue-600 to-sky-500 border-none"
            />
            <p className="text-xs text-center text-gray-500 mt-4">
              Don’t have an account?{" "}
              <span className="text-blue-500 cursor-pointer">
                Contact your administrator
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
