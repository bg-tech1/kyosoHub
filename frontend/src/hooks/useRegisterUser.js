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
            setRegisterUserError(false);
            navigate("/post");
        } catch (error) {
            console.log(error);
            setRegisterUserError(true);
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