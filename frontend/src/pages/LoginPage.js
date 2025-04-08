import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import useFormValidation from "../hooks/useFormValidation";
import { useMemo } from "react";

const LoginPage = () => {
    const initialValues = useMemo(() => ({
        "email": "",
        "password": ""
    }), []);
    const validationRules = useMemo(() => ({
        "email": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        "password": "^(?=.*[a-z]).{4,}$"
    }), []);

    const {
        setEmail,
        setPassword,
        loginError,
        handleLogin
    } = useAuth();

    const {
        errors,
        values,
        setValues,
        isFormValid
    } = useFormValidation(initialValues, validationRules)

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
                                htmlFor="email"
                                className="block mb-1 text-gray-700 font-medium"
                            >
                                メールアドレス
                            </label>
                            <input
                                type="text"
                                id="email"
                                value={values.email}
                                onChange={(e) => {
                                    setValues(prev => ({ ...prev, "email": e.target.value }));
                                    setEmail(e.target.value);
                                }}
                                placeholder="メールアドレスを入力してください"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.email && (
                                < p className="text-red-500 text-sm mb-4">有効なメールアドレスの形式で入力してください（例: example@example.com）</p>
                            )}
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
                                value={values.password}
                                onChange={(e) => {
                                    setValues(prev => ({ ...prev, "password": e.target.value }));
                                    setPassword(e.target.value);
                                }}
                                placeholder="パスワードを入力してください"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.password && (
                                < p className="text-red-500 text-sm mb-4">パスワードは4文字以上の必要があります。</p>
                            )}

                        </div>
                        {loginError && (
                            <p className="text-red-500 text-sm mb-4">メールアドレスまたはパスワードが間違っています。</p>
                        )}
                        {isFormValid ? (
                            <button
                                type="submit"
                                className="block w-full mt-4 py-2 rounded bg-secondary text-white font-semibold hover:opacity-90 focus:opacity-90 transition-opacity"
                            >
                                Login
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled
                                className="block w-full mt-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold hover:opacity-90 focus:opacity-90 transition-opacity"
                            >
                                Login
                            </button>

                        )}
                    </form>
                    <div className="mt-4 text-center">
                        <Link to="/register" className="text-blue-500 underline">
                            新規登録はこちらから
                        </Link>
                    </div>
                </div>
            </div >
            <Footer />
        </div >
    );
};

export default LoginPage;
