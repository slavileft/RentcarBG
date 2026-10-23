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
        const result = await authApi.register(userData);

        setAuth(result);

        navigate("/");
    };

    const loginHandler = async (userData) => {
        const result = await authApi.login(userData);

        setAuth(result);

        navigate("/");
    };

    const logoutHandler = async () => {
        const token = auth?.access_token;
    setAuth(null);                  // log out locally first

    if (token) {
        try {
            await authApi.logout(token);
        } catch {
            // ignore: the user is already logged out
        }
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