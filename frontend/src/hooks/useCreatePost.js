import { useState } from "react";
import apiClient from "../api/apiClient";

export function useCreatePost() {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [createPostError, setCreatePostError] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const handleSubmitPost = async () => {
        try {
            await apiClient.post("/post", {
                title,
                description,
                category,
            });
        } catch (error) {
            setCreatePostError(true);
            console.error(error);
        } finally {
            setShowModal(false);
            setTitle("");
            setDescription("");
            setCategory("");
            setCreatePostError(false);
        }
    };
    return {
        showModal,
        openModal,
        closeModal,
        title,
        setTitle,
        description,
        setDescription,
        category,
        setCategory,
        createPostError,
        handleSubmitPost
    };
}