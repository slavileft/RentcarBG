import { useContext } from "react";
import { Navigate, Outlet } from "react-router";

import AuthContext from "../../context/auth-context";

export default function GuestGuard() {
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}