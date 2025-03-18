import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UnAuthorizedErrorPage = () => {
    return (
        <div className="bg-primary min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-red-500 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.196 0 2.25-.81 2.45-1.995l1.615-9c.25-1.396-.794-2.59-2.205-2.59H4.07c-1.411 0-2.455 1.194-2.205 2.59l1.615 9c.2 1.185 1.254 1.995 2.45 1.995z"
                        />
                    </svg>

                    <h1 className="text-3xl font-bold text-gray-800 mb-2">認証エラー</h1>
                    <p className="text-gray-600 mb-6">
                        セッションの有効期限が切れたか、認証が必要なページです。
                        再度ログインしてからお試しください。
                    </p>
                    <Link
                        to="/login"
                        className="inline-block bg-secondary text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-opacity-90 transition-opacity"
                    >
                        ログイン画面へ
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default UnAuthorizedErrorPage;
