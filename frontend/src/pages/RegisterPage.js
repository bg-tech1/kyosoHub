import Header from "../components/Header";
import Footer from "../components/Footer";

import { useRegisterUser } from "../hooks/useRegisterUser";
import useFormValidation from "../hooks/useFormValidation";
import { useMemo } from "react";

const RegisterPage = () => {
    const initialValues = useMemo(() => (
        {
            "username": "",
            "email": "",
            "password": ""
        }
    ), []);

    const validationRules = useMemo(() => ({
        "username": "^[\\p{L}\\p{N}_\\-.]{1,}$",
        "email": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        "password": "^(?=.*[a-z]).{4,}$"
    }), []);

    const {
        setUsername,
        setEmail,
        setPassword,
        registerUserError,
        handleRegister,
    } = useRegisterUser();

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
                                value={values.username}
                                onChange={(e) => {
                                    setValues(prev => ({ ...prev, "username": e.target.value }));
                                    setUsername(e.target.value);
                                }}
                                placeholder="ユーザー名を入力してください"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mb-4">有効なユーザー名を入力してください</p>
                            )}
                        </div>
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
                                <p className="text-red-500 text-sm mb-4">有効なメールアドレスの形式で入力してください（例: example@example.com）</p>
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
                                <p className="text-red-500 text-sm mb-4">パスワードは4文字以上の必要があります。</p>
                            )}
                        </div>

                        {registerUserError && (
                            <p className="text-red-500 text-sm mb-4">登録に失敗しました。</p>
                        )}

                        {isFormValid ? (
                            <button
                                type="submit"
                                className="block w-full mt-4 py-2 rounded bg-secondary text-white font-semibold hover:opacity-90 focus:opacity-90 transition-opacity"
                            >
                                新規登録
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled
                                className="block w-full mt-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold hover:opacity-90 focus:opacity-90 transition-opacity"
                            >
                                新規登録
                            </button>
                        )}
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RegisterPage;