import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "../src/context/ThemeContext";
import BaseLayout from "./layouts/BaseLayout";
import LoginPage from "./components/login/LoginPage";
import Userimport from "./components/dashboard/Dashindex";





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
          <Route path="/dashboard" element={<Userimport />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      
       
      </Routes>
    </ThemeProvider>
  );
}

export default App;
