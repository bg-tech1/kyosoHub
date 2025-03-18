import React from "react";

const HeroSection = ({ handleNavigate }) => {
    return (
        <section className="bg-[#ffe2a3] py-20 text-center">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold text-gray-800">KyosoHubへようこそ</h1>
                <p className="mt-4 text-lg text-gray-600">
                    あなたのアイデアを形にする仲間を見つけよう！
                </p>
                <button
                    onClick={handleNavigate}
                    className="mt-6 bg-secondary text-white px-6 py-3 rounded-full text-lg hover:bg-tertiary transition-colors duration-300">
                    プロジェクトを探す
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
