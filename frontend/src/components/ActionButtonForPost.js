const ActionButtonForPost = ({
    post,
    userId,
    participationStatus,
    handleParticipation,
    isGuest }) => {
    const status = participationStatus[post.id];
    let button;
    console.log("isGuest", isGuest);
    if (isGuest) {
        button = (
            <button
                className="mt-5 bg-secondary text-white px-4 py-2 rounded-full"
                onClick={() => {
                    alert("ゲストユーザーは参加できません。ログインしてください。");
                }}
            >
                参加する
            </button>
        );
    }
    else if (post.user_id === userId) {
        button = (
            <button className="mt-5 bg-gray-600 text-white px-4 py-2 rounded-full" disabled>
                自分の投稿
            </button>
        );
    }
    else if (status === "pending") {
        button = (
            <button className="mt-5 bg-yellow-400 text-white px-4 py-2 rounded-full" disabled>
                申請中
            </button>
        );
    } else if (status === "approved") {
        button = (
            <button className="mt-5 bg-gray-600 text-white px-4 py-2 rounded-full" disabled>
                参加中
            </button >
        );
    }
    else {
        button = (
            <button
                type="button"
                className="mt-5 bg-secondary text-white px-4 py-2 rounded-full hover:bg-tertiary transition-colors duration-300"
                onClick={() => {
                    handleParticipation(post.id);
                }}
            >
                参加する
            </button >
        );
    }
    return (
        button
    )
}
export default ActionButtonForPost;