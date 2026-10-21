import { Navigate } from "react-router";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/auth-context.js";

export default function Logout() {
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        logout();
    }, [logout]);

    return (
        <Navigate to="/" />
    );
}