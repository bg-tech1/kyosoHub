import { useEffect, useState } from "react";
import { toHiragana } from "wanakana";
export function useSearchPosts(posts) {
    const sortPosts = (posts) => {
        return posts.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        });
    }
    const sortedPosts = sortPosts(posts);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPosts, setFilteredPosts] = useState(sortedPosts);
    const normalizeText = (text) => {
        if (!text) return "";
        return toHiragana(text).toLowerCase();
    };
    const handleSearch = () => {
        if (!searchTerm.trim()) {
            setFilteredPosts(sortedPosts);
            return;
        }
        const normalizedSearchTerm = normalizeText(searchTerm);
        const filtered = sortedPosts.filter(post =>
            normalizeText(post.title).includes(normalizedSearchTerm) ||
            normalizeText(post.description).includes(normalizedSearchTerm) ||
            normalizeText(post.category).includes(normalizedSearchTerm)
        );
        setFilteredPosts(filtered);
    };
    useEffect(() => {
        setFilteredPosts(sortPosts(posts));
    }, [posts]);
    return {
        searchTerm,
        setSearchTerm,
        filteredPosts,
        handleSearch
    };
}
