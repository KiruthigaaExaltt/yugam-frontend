import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "../src/context/ThemeContext";
import BaseLayout from "./layouts/BaseLayout";
import LoginPage from "./features/auth/LoginPage";
import ForgotPassword from "./features/auth/ForgotPassword";
import ResetPassword from "./features/auth/ResetPassword";
import VerifyOtp from "./features/auth/VerifyOtp"; 
import OrbitIndex from "./features/orbit/OrbitIndex";
import EstimoIndex from "./features/estimo/EstimoIndex";
import Userimport from "./features/dashboard/Dashindex";
import Crewindex from "./features/crew/Crewindex";
import UAMIndex from "./features/uam/UAMIndex";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./features/auth/authSlice";
import NotFound from "./components/NotFound";
import ResponsiveImage from "./components/common/ResponsiveImage/ResponsiveImage";

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <ThemeProvider>
      <Routes>
        {/* 🔓 Public routes */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route path="/responsive-image" element={<ResponsiveImage />} />

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
        {/* Default redirect to NotFound */}
        <Route path="*" element={<NotFound />} />


      </Routes>
    </ThemeProvider>
  );
}

export default App;
