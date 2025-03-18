import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

export function useAuth() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post("/auth/login", {
                email,
                password
            });
            setLoginError("");
            navigate("/post");
        } catch (error) {
            console.log(error);
            setLoginError(true);
        }
    };
    const handleLogout = async () => {
        try {
            await apiClient.post("/auth/logout");
            setIsLoggedIn(false);
            navigate("/login");
        } catch (error) {
            console.error("ログアウトに失敗しました", error);
        }
    };

    useEffect(() => {
        const handleAuthStatus = async () => {
            try {
                await apiClient.get("/user/info");
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
            }
        };
        handleAuthStatus();
    }, []);

    return {
        email,
        setEmail,
        password,
        setPassword,
        isLoggedIn,
        loginError,
        handleLogin,
        handleLogout
    };
}