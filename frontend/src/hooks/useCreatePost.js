import { useState } from "react";
import apiClient from "../api/apiClient";

export function useCreatePost({ fetchAllPosts }) {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [createPostError, setCreatePostError] = useState(false);
    const openModal = () => {
        setTitle("");
        setDescription("");
        setCategory("");
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const handleSubmitPost = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post("/post", {
                title,
                description,
                category,
            });
            await fetchAllPosts();
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