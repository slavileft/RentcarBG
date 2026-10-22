import { createContext } from "react";
import { useNavigate } from "react-router";
import { authApi } from "../api/index"
import usePersistedState from "../hooks/usePersistedState";


const AuthContext = createContext({
    accessToken: '',
    user: {},
    isAuthenticated: false,
    register() { },
    login() { },
    logout() { },
});

export function AuthProvider({
    children,
}) {
    const navigate = useNavigate();
    const [auth, setAuth] = usePersistedState('auth', null);

    const registerHandler = async (userData) => {
        try {
            const result = await authApi.register(userData);

            setAuth(result);

            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    };

    const loginHandler = async (userData) => {
        try {
            const result = await authApi.login(userData);

            setAuth(result);

            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    };

    const logoutHandler = async () => {
        try {
            await authApi.logout(auth?.access_token);

            setAuth(null);
        } catch (error) {
            alert(error.message);
        }
    }

    const contextValue = {
        accessToken: auth?.access_token,
        user: auth?.user,
        isAuthenticated: !!auth,
        register: registerHandler,
        login: loginHandler,
        logout: logoutHandler,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;