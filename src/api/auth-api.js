import request from "../utils/request";

export const register = async ({email,password}) => {
    return request(import.meta.env.VITE_AUTH_URL, "/signup", "POST", {email,password});
};

export const login = async ({email,password}) => {
    return request(import.meta.env.VITE_AUTH_URL, "/token?grant_type=password", "POST", {email,password});
};

export const logout = async (accessToken) => {
    return request(import.meta.env.VITE_AUTH_URL, "/logout", "POST", null, accessToken);
};