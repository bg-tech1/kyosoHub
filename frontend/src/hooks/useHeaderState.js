import { useState } from "react";

export function useHeaderState() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    return { isOpen, toggleMenu, closeMenu };
}
