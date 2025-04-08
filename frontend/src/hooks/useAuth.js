import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

export function useAuth() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isGuest, setIsGuest] = useState(() => {
        return localStorage.getItem("auth_isGuest") === "true";
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

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

    useEffect(() => {
        localStorage.setItem("auth_isGuest", isGuest);
    }, [isGuest]);

    const handleGuestLogin = async () => {
        try {
            await apiClient.post('/auth/guest-login');
            setIsGuest(true);
            navigate("/collaborationPosts");
        } catch (error) {
            console.error('ゲストログインに失敗しました:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post("/auth/login", {
                email,
                password
            });
            setIsGuest(false);
            setLoginError("");
            navigate("/collaborationPosts");
        } catch (error) {
            console.log(error);
            setLoginError(true);
        }
    };
    const handleLogout = async () => {
        try {
            await apiClient.post("/auth/logout");
            setIsLoggedIn(false);
            setIsGuest(false);
            navigate("/login");
        } catch (error) {
            console.error("ログアウトに失敗しました", error);
        }
    };

    return {
        email,
        setEmail,
        setPassword,
        isLoggedIn,
        loginError,
        handleLogin,
        handleLogout,
        handleGuestLogin,
        isGuest
    };
}