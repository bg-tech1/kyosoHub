import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

export function useGetAllPosts() {
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [fetchPostsError, setFetchPostsError] = useState(false);
    const fetchAllPosts = async () => {
        try {
            setLoadingPosts(true);
            const res = await apiClient.get("/posts", {
                params: {
                    scope: "all",
                    status: "any",
                },
            });
            setPosts(res.data.posts);
        } catch (error) {
            setFetchPostsError(true);
            console.error(error);
        } finally {
            setLoadingPosts(false);
            setFetchPostsError(false);
        }
    };
    useEffect(() => {
        fetchAllPosts();
    }, []);
    return {
        posts, fetchAllPosts, loadingPosts, fetchPostsError
    };
}