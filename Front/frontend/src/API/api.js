import axios from "axios";
import { getToken } from "../helpers";

const api = axios.create({
    baseURL: "https://localhost:5001/api",
});

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        console.log("Отправка запроса с токеном:", token);
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;