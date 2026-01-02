
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Message } from "primereact/message";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
// import { useLoginMutation } from "./authapi";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // const [login, { isLoading }] = useLoginMutation();

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    auth?: string;
  }>({});

  // 🔹 TEMP VALID CREDENTIALS (Mock)
  const VALID_EMAIL = "kiruthigaa@gmail.com";
  const VALID_PASSWORD = "Password@123";

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      // ✅ MOCK TOKEN (Later this will come from backend)
      const mockToken = "mock-jwt-token-123456";

      // ✅ Store token
      localStorage.setItem("token", mockToken);

      // ✅ Optional remember me flag
      if (remember) {
        localStorage.setItem("remember", "true");
      }

      // ✅ Navigate after login
      navigate("/dashboard");
    } else {
      setErrors({
        auth: "Invalid email or password",
      });
    }
  };

  //   const validate = () => {
  //   const newErrors: typeof errors = {};

  //   if (!username) {
  //     newErrors.email = "Email is required";
  //   }

  //   if (!password) {
  //     newErrors.password = "Password is required";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };
  // const handleLogin = async () => {
  //   if (!validate()) return;

  //   try {
  //     const res = await login({
  //       username,
  //       password,
  //     }).unwrap();

  //     // ✅ Store token
  //     localStorage.setItem("token", res.token);

  //     if (remember) {
  //       localStorage.setItem("remember", "true");
  //     }

  //     navigate("/dashboard");
  //   } catch (err) {
  //     console.log(err);
  //     setErrors({
  //       auth: "Invalid username or password",
  //     });
  //   }
  // };

  // fetch("https://dummyjson.com/auth/login", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     username: "kminchelle",
  //     password: "0lelplR",
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then(console.log)
  //   .catch(console.error);
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

          {errors.auth && (
            <Message
              severity="error"
              text={errors.auth}
              className="mb-3 w-full"
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
              />
              <label htmlFor="email">Email Address</label> 
              {/* <InputText
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="username">Username</label> */}
            </span>
            {errors.email && <small className="p-error">{errors.email}</small>}

            <span className="p-float-label w-full">
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                feedback={false}
                className={`w-full ${errors.password ? "p-invalid" : ""}`}
                inputClassName="w-full"
              />
              <label htmlFor="password">Password</label>
            </span>
            {errors.password && (
              <small className="p-error">{errors.password}</small>
            )}

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Checkbox
                  inputId="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.checked ?? false)}
                />
                <label htmlFor="remember">Remember me</label>
              </div>

              <a href="#" className="text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              label="Sign In"
              onClick={handleLogin}
              className="w-full p-button-lg bg-linear-to-r from-blue-600 to-sky-500 border-none"
            />

            {/* <Button
              label={isLoading ? "Signing In..." : "Sign In"}
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full p-button-lg bg-linear-to-r from-blue-600 to-sky-500 border-none"
            /> */}

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
