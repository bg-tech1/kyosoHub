import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            if (window.location.pathname !== "/unauthorized" &&
                window.location.pathname !== "/login" &&
                window.location.pathname !== "/register" &&
                window.location.pathname !== "/") {
                window.location.href = "/unauthorized";
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
