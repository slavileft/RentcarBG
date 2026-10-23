import { useContext } from "react";
import { Navigate, Outlet } from "react-router";

import AuthContext from "../../context/auth-context";

export default function AuthGuard() {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}