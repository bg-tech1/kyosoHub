import Header from "../components/Header";
import Footer from "../components/Footer";

import { useRegisterUser } from "../hooks/useRegisterUser";

const RegisterPage = () => {
    const {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        registerUserError,
        handleRegister,
    } = useRegisterUser();
    return (
        <div className="flex flex-col min-h-screen bg-primary">
            <Header />
            <div className="flex flex-1 items-center justify-center">
                <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        新規登録
                    </h2>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label
                                htmlFor="username"
                                className="block mb-1 text-gray-700 font-medium"
                            >
                                ユーザー名
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="ユーザー名を入力してください"
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
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

                        {registerUserError && (
                            <p className="text-red-500 text-center font-bold">登録に失敗しました。</p>
                        )}

                        <button
                            type="submit"
                            className="block w-full mt-4 py-2 rounded bg-secondary text-white font-semibold hover:opacity-90 focus:opacity-90 transition-opacity"
                        >
                            新規登録
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RegisterPage;