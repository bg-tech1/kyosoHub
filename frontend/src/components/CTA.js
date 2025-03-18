import React from "react";

const CTA = ({ handleNavigate }) => {
    return (
        <section className="bg-blue-500 text-white py-20 text-center">
            <h2 className="text-4xl font-bold">今すぐプロジェクトを始めよう！</h2>
            <p className="mt-4 text-lg">あなたのアイデアに共感する仲間が待っています。</p>
            <button
                onClick={handleNavigate}
                className="mt-6 bg-white text-blue-500 px-6 py-3 rounded-full text-lg hover:bg-gray-200">
                プロジェクトを作成する
            </button>
        </section>
    );
};

export default CTA;
