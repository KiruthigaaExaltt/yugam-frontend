import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "../src/context/ThemeContext";
import BaseLayout from "./layouts/BaseLayout";
import LoginPage from "./components/login/LoginPage";
import Footer from "./components/footer/Footer";
import IndexDashboard from "./components/dashboard/Admin/IndexDashboard";
import IndexCRM from "./components/CRM/IndexCRM";
import IndexSettings from "./components/settings/IndexSettings";
import IndexAccounts from "./components/accounts/IndexAccounts";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <ThemeProvider>
      <Routes>
        {/* 🔓 Public route */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🔒 Protected routes */}
        <Route
          element={
            isAuthenticated ? <BaseLayout /> : <Navigate to="/login" replace />
          }
        >
          <Route path="/dashboard" element={<IndexDashboard />} />
          <Route path="/crm" element={<IndexCRM />} />
          <Route path="/accounts" element={<IndexAccounts />} />
          <Route path="/settings" element={<IndexSettings />} />
          <Route path="/footer" element={<Footer />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
