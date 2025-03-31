import { Menu, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useHeaderState } from "../hooks/useHeaderState";
import { useNavItems } from "../hooks/useNavItems";
const Header = () => {
    const { handleLogout, isLoggedIn, handleGuestLogin } = useAuth();
    const { navItems } = useNavItems(isLoggedIn);
    const { isOpen, toggleMenu, closeMenu } = useHeaderState();
    return (
        <header className="bg-primary shadow-md">
            <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
                <h1
                    className="text-2xl font-bold text-gray-800 cursor-pointer"
                    onClick={() => window.location.href = '/'}
                >
                    KyosoHub
                </h1>
                <button
                    onClick={toggleMenu}
                    className="sm:hidden text-gray-600 hover:text-blue-500 focus:outline-none"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                <nav className="hidden sm:flex space-x-6 items-center">
                    {navItems.map((item) => (
                        <a key={item.href} href={item.href} className="text-gray-600 hover:text-blue-500">{item.label}</a>
                    ))}
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="justify-center bg-secondary text-white px-4 py-2 rounded-full hover:bg-tertiary transition-colors duration-300"
                        >
                            ログアウト
                        </button>
                    ) : (
                        <span className="space-x-4">
                            <a
                                href="/login"
                                className="justify-center bg-secondary text-white px-4 py-2 rounded-full hover:bg-tertiary transition-colors duration-300"
                            >
                                ログイン
                            </a>
                            <a
                                onClick={handleGuestLogin}
                                className="justify-center bg-secondary text-white px-4 py-2 rounded-full hover:bg-tertiary transition-colors duration-300"
                            >
                                ゲストログイン
                            </a>
                        </span>
                    )}
                </nav>
            </div>
            {isOpen && (
                <div className="sm:hidden bg-white shadow-md absolute top-16 left-0 right-0 z-50 flex flex-col items-center space-y-4 py-4">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-gray-600 hover:text-blue-500 text-lg"
                            onClick={closeMenu}
                        >
                            {item.label}
                        </a>
                    ))}
                    {isLoggedIn ? (
                        <button
                            onClick={() => { handleLogout(); closeMenu(); }}
                            className="bg-secondary text-white px-4 py-2 rounded-full hover:bg-tertiary transition-colors duration-300"
                        >
                            ログアウト
                        </button>
                    ) : (
                        <a
                            href="/login"
                            className="bg-secondary text-white px-4 py-2 rounded-full hover:bg-tertiary transition-colors duration-300"
                            onClick={closeMenu}
                        >
                            ログイン
                        </a>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
