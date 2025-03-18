import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

export function useMyProfile() {
    const [userProfile, setUserProfile] = useState(null);
    const [loadingUser, setLoadingUser] = useState(false);
    const [fetchMyProfileError, setFetchMyProfileError] = useState(false);
    const fetchMyProfile = async () => {
        try {
            setLoadingUser(true);
            const res = await apiClient.get("/user/profile");
            setUserProfile(res.data.userProfile);
        } catch (err) {
            setFetchMyProfileError(true);
        } finally {
            setLoadingUser(false);
            setFetchMyProfileError(false);
        }
    };
    useEffect(() => {
        fetchMyProfile();
    }, []);
    return {
        userProfile, fetchMyProfile, loadingUser, fetchMyProfileError
    };
}
