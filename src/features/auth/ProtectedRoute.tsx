import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentPermissions, selectIsAuthenticated } from "./authSlice";

interface ProtectedRouteProps {
    children: ReactNode;
    permission?: string;
}

const ProtectedRoute = ({ children, permission }: ProtectedRouteProps) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const permissions = useSelector(selectCurrentPermissions);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (permission && !permissions.includes(permission)) {
        // If user is authenticated but lacks the specific permission, 
        // redirect to dashboard or an unauthorized page
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
