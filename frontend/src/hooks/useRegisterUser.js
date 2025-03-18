import { useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";

export function useRegisterUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [registerUserError, setRegisterUserError] = useState(false);
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post("/user", {
                username,
                email,
                password,
            });
        } catch (error) {
            console.log(error);
            setRegisterUserError(true);
        } finally {
            setRegisterUserError(false);
            navigate("/post");
        }
    };
    return {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        registerUserError,
        handleRegister
    }
} 