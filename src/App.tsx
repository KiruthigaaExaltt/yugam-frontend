import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "../src/context/ThemeContext";
import BaseLayout from "./layouts/BaseLayout";
import LoginPage from "./components/login/LoginPage";
import Footer from "./components/footer/Footer";
import IndexDasboard from "./components/dashboard/IndexDasboard";
import IndexCRM from "./components/CRM/IndexCRM";
import IndexSettings from "./components/settings/IndexSettings";

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
          <Route path="/dashboard" element={<IndexDasboard />} />
          <Route path="/crm" element={<IndexCRM />} />
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
