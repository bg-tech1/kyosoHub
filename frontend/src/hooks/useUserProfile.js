import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

export function useUserProfile(userId) {
    const [userProfile, setUserProfile] = useState(null);
    const [loadingUser, setLoadingUser] = useState(false);
    const [errorUser, setErrorUser] = useState(null);
    const fetchUserProfile = async (userId) => {
        try {
            setLoadingUser(true);
            const res = await apiClient.get("/user/profile", {
                params: {
                    userId
                }
            });
            setUserProfile(res.data.userProfile);
        } catch (err) {
            setErrorUser("ユーザー情報の取得に失敗しました");
        } finally {
            setLoadingUser(false);
        }
    };
    useEffect(() => {
        if (userId) {
            fetchUserProfile(userId);
        }
    }, [userId]);
    return {
        userProfile, fetchUserProfile, loadingUser, errorUser
    };
}
