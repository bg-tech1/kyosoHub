import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";

export function useProfileForm(userProfile, fetchMyProfile) {
    const [username, setUsername] = useState("");
    const [gender, setGender] = useState("");
    const [bio, setBio] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [fetchUserProfileError, setFetchUserProfileError] = useState(false);
    useEffect(() => {
        if (showModal && userProfile) {
            setUsername(userProfile.username || "");
            setGender(userProfile.gender || "");
            setBio(userProfile.bio || "");
            setBirthdate(userProfile.birthdate || "");
        }
    }, [showModal, userProfile]);

    const handleEditProfile = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const handleSubmitUserProfile = async (e) => {
        e.preventDefault();
        try {
            await apiClient.put("/user/profile", {
                username,
                gender,
                bio,
                birthdate,
            });
            await fetchMyProfile();
        } catch (err) {
            console.error(err);
            setFetchUserProfileError(true);
        } finally {
            setFetchUserProfileError(false);
            setShowModal(false);
        }
    };

    return {
        username,
        setUsername,
        gender,
        setGender,
        bio,
        setBio,
        birthdate,
        setBirthdate,
        showModal,
        handleEditProfile,
        closeModal,
        handleSubmitUserProfile,
        fetchUserProfileError
    };
}
