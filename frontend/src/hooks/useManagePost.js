import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

export function useManagePost(fetchPostData) {
    const [showEditPostModal, setShowEditPostModal] = useState(false);
    const [showDeletePostModal, setShowDeletePostModal] = useState(false);
    const [post, setPost] = useState({});
    const [postId, setPostId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [updatePostError, setUpdatePostError] = useState(null);
    const [deletePostError, setDeletePostError] = useState(null);

    useEffect(() => {
        if (showEditPostModal && post) {
            setPostId(post.id || "");
            setTitle(post.title || "");
            setDescription(post.description || "");
            setCategory(post.category || "");
        }
    }, [showEditPostModal, post]);

    const closeEditPostModal = () => {
        setShowEditPostModal(false);
    }

    const closeDeletePostModal = () => {
        setShowDeletePostModal(false);
    }

    const handleEdit = (post) => {
        setPost(post);
        setShowEditPostModal(true);
    }

    const handleDelete = (postId) => {
        setPostId(postId);
        setShowDeletePostModal(true);
    }

    const handleUpdatePost = async (postId, title, description, category) => {
        await updatePost(postId, title, description, category);
        setShowEditPostModal(false);
    }

    const handleDeletePost = async (postId) => {
        await deletePost(postId);
        await fetchPostData();
        setShowDeletePostModal(false);
    }

    const updatePost = async (postId, title, description, category) => {
        try {
            await apiClient.patch("/post", {
                id: postId,
                title,
                description,
                category
            });
        } catch (error) {
            console.log(error);
            setUpdatePostError(true);
        } finally {
            setUpdatePostError(false
            );
        }
    }

    const deletePost = async (postId) => {
        try {
            await apiClient.delete(`/post/${postId}`);
        } catch (error) {
            console.log(error);
            setDeletePostError(true);
        } finally {
            setDeletePostError(false);
        }
    }
    return {
        postId,
        title,
        setTitle,
        description,
        setDescription,
        category,
        setCategory,
        updatePostError,
        deletePostError,
        showEditPostModal,
        handleEdit,
        showDeletePostModal,
        handleDelete,
        handleUpdatePost,
        handleDeletePost,
        closeEditPostModal,
        closeDeletePostModal
    };
};