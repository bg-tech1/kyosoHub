import { useState } from "react";

export function usePagination(filteredPosts, postsPerPage = 5) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const lastIndex = currentPage * postsPerPage;
    const firstIndex = lastIndex - postsPerPage;
    const currentItems = filteredPosts.slice(firstIndex, lastIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return {
        currentPage,
        totalPages,
        currentItems,
        handleNextPage,
        handlePrevPage
    };
}