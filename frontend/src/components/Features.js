import React from "react";

const features = [
    {
        title: "アイデアを共有",
        description: "あなたのアイデアを投稿し、共に創る仲間を探しましょう。",
        icon: "💡",
    },
    {
        title: "プロジェクトを見つける",
        description: "興味のあるプロジェクトに参加し、新たな挑戦をしましょう。",
        icon: "🔍",
    },
    {
        title: "仲間とコラボレーション",
        description: "チームを組み目標を達成しましょう。",
        icon: "🤝",
    },
];

const Features = () => {
    return (
        <section className="py-20 bg-primary text-center">
            <h2 className="text-4xl font-bold text-gray-800">このアプリでできること</h2>
            <div className="max-w-4xl mx-auto mt-10 grid gap-10 md:grid-cols-3">
                {features.map((feature, index) => (
                    <div key={index} className="p-6 bg-gray-100 rounded-xl shadow-md">
                        <div className="text-6xl">{feature.icon}</div>
                        <h3 className="text-2xl font-semibold text-gray-800 mt-4">{feature.title}</h3>
                        <p className="text-gray-600 mt-2">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
