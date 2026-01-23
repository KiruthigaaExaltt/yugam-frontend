import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "../src/context/ThemeContext";
import BaseLayout from "./layouts/BaseLayout";
import LoginPage from "./components/login/LoginPage";
import OrbitIndex from "./components/orbit/OrbitIndex";
import EstimoIndex from "./components/estimo/EstimoIndex";
import Userimport from "./components/dashboard/Dashindex";
import Crewindex from "./components/crew/Crewindex";





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
           <Route path="/orbit" element={<OrbitIndex />} />
           <Route path="/estimo" element={<EstimoIndex />} />
          <Route path="/dashboard" element={<Userimport />} />
          <Route path="/crew" element={<Crewindex />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      
       
      </Routes>
    </ThemeProvider>
  );
}

export default App;
