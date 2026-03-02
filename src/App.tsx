import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "../src/context/ThemeContext";
import BaseLayout from "./layouts/BaseLayout";
import LoginPage from "./components/login/LoginPage";
import ForgotPassword from "./components/login/ForgotPassword";
import ResetPassword from "./components/login/ResetPassword";
import VerifyOtp from "./components/login/VerifyOtp"; // Import VerifyOtp
import OrbitIndex from "./components/orbit/OrbitIndex";
import EstimoIndex from "./components/estimo/EstimoIndex";
import Userimport from "./components/dashboard/Dashindex";
import Crewindex from "./components/crew/Crewindex";
import UAMIndex from "./components/uam/UAMIndex";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./components/login/authSlice";

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <ThemeProvider>
      <Routes>
        {/* 🔓 Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* 🔒 Protected routes */}
        <Route
          element={
            isAuthenticated ? <BaseLayout /> : <Navigate to="/login" replace />
          }
        >
          <Route path="/orbit" element={<OrbitIndex />} />
          <Route path="/estimo" element={<EstimoIndex />} />
          <Route path="/dashboard" element={<Userimport />} />
          <Route path="/crew" element={<Crewindex />} />
          <Route path="/uam" element={<UAMIndex />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" />} />


      </Routes>
    </ThemeProvider>
  );
}

export default App;
