import api from "./api";

export const authApi = {
    login: (email, password) => api.post("/auth/login", { email, password }),
    register: (email, name, password) => api.post("/auth/register", { email, name, password }),
};
