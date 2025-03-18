import { useEffect, useState } from "react";
import { toHiragana } from "wanakana";
export function useSearchPosts(posts) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const normalizeText = (text) => {
        if (!text) return "";
        return toHiragana(text).toLowerCase();
    };
    const handleSearch = () => {
        if (!searchTerm.trim()) {
            setFilteredPosts(posts);
            return;
        }
        const normalizedSearchTerm = normalizeText(searchTerm);
        const filtered = posts.filter(post =>
            normalizeText(post.title).includes(normalizedSearchTerm) ||
            normalizeText(post.description).includes(normalizedSearchTerm) ||
            normalizeText(post.category).includes(normalizedSearchTerm)
        );
        console.log(searchTerm, filtered);
        setFilteredPosts(filtered);
    };
    useEffect(() => {
        setFilteredPosts(posts);
    }, [posts]);
    return {
        searchTerm,
        setSearchTerm,
        filteredPosts,
        handleSearch
    };
}
