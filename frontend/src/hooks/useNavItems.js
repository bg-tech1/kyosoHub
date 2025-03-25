import { useEffect, useState } from "react";

export function useNavItems(isLoggedIn) {
    const [navItems, setNavItems] = useState([]);
    useEffect(() => {
        fetchNavItems(isLoggedIn);
    }, [isLoggedIn]);

    const fetchNavItems = (isLoggedIn) => {
        if (isLoggedIn) {
            setNavItems([
                { label: "プロジェクト一覧", href: "/collaborationPosts" },
                { label: "マイページ", href: "/mypage" }
            ]);
        } else {
            setNavItems([
                { label: "About", href: "/" },
                { label: "プロジェクト一覧", href: "/login" },
            ]);
        }
    };
    return { navItems };
}
