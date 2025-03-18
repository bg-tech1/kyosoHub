import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        loginError,
        handleLogin
    } = useAuth();
    return (
        <div className="flex flex-col min-h-screen bg-primary">
            <Header />
            <div className="flex flex-1 items-center justify-center">
                <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        ログイン
                    </h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label
                                htmlFor="username"
                                className="block mb-1 text-gray-700 font-medium"
                            >
                                メールアドレス
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="メールアドレスを入力してください"
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-1 text-gray-700 font-medium"
                            >
                                パスワード
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="パスワードを入力してください"
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        {loginError && (
                            <p className="text-red-500 text-center font-bold">メールアドレスまたはパスワードが間違っています。</p>
                        )}
                        <button
                            type="submit"
                            className="block w-full mt-4 py-2 rounded bg-secondary text-white font-semibold hover:opacity-90 focus:opacity-90 transition-opacity"
                        >
                            Login
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <Link to="/register" className="text-blue-500 underline">
                            新規登録はこちらから
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;
