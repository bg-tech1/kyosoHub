import { useEffect, useState, useCallback } from "react";
import apiClient from "../api/apiClient";

export function useUserPosts(userId) {
    const TAB_RECRUITING = "recruiting";
    const TAB_PARTICIPATING = "participating";
    const TAB_PENDING = "pending";
    const [activeTab, setActiveTab] = useState(TAB_RECRUITING);

    const [postData, setPostData] = useState({
        [TAB_RECRUITING]: [],
        [TAB_PARTICIPATING]: [],
        [TAB_PENDING]: [],
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTabChange = (newTab) => {
        setActiveTab(newTab);
    };
    const postCount = postData[TAB_RECRUITING].length;
    const paritcipationsCount = postData[TAB_PARTICIPATING].length;

    const fetchAllTabsData = useCallback(async () => {
        if (userId === undefined) {
            try {
                setLoading(true);
                setError(null);
                const [recruitingRes, participatingRes, pendingRes] = await Promise.all([
                    apiClient.get("/posts", {
                        params: {
                            scope: "user",
                            status: "recruiting"
                        }
                    }),
                    apiClient.get("/posts", {
                        params: {
                            scope: "user",
                            status: "approved"
                        }
                    }),
                    apiClient.get("/posts", {
                        params: {
                            scope: "user",
                            status: "pending"
                        }
                    }),
                ]);
                setPostData({
                    [TAB_RECRUITING]: recruitingRes.data.posts || [],
                    [TAB_PARTICIPATING]: participatingRes.data.posts || [],
                    [TAB_PENDING]: pendingRes.data.posts || [],
                });
            } catch (err) {
                setError("データ取得に失敗しました");
                console.error(err);
            } finally {
                setLoading(false);
            }
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const [recruitingRes, participatingRes] = await Promise.all([
                apiClient.get("/posts", {
                    params: {
                        scope: "user",
                        userId,
                        status: "recruiting"
                    }
                }),
                apiClient.get("/posts", {
                    params: {
                        scope: "user",
                        userId,
                        status: "approved"
                    }
                })
            ]);
            setPostData({
                [TAB_RECRUITING]: recruitingRes.data.posts || [],
                [TAB_PARTICIPATING]: participatingRes.data.posts || [],
            });
        } catch (err) {
            setError("データ取得に失敗しました");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchAllTabsData();
    }, [fetchAllTabsData]);

    return { postData, handleTabChange, activeTab, loading, error, postCount, paritcipationsCount, fetchPostData: fetchAllTabsData };
}