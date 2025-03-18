import { useNavigate } from "react-router-dom";
import ActionButtonForPost from "./ActionButtonForPost";

const PostCard = ({
    post,
    userId,
    participationStatus,
    handleParticipation,
    postParticipationError,
    fetchPostsError,
    fetchStatusError
}) => {
    const navigate = useNavigate();
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg relative">
            <span className="absolute top-2 right-3 text-sm text-blue-600 cursor-pointer hover:underline"
                onClick={() => {
                    navigate(`/profile/${post.user.id}`);
                }} >
                投稿者: {post.user.userProfile.username}さん
            </span>
            <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
            <p className="text-gray-600 mt-2 whitespace-pre-wrap">{post.description}</p>
            <div className="mt-4">
                <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full mr-2">
                    #{post.category}
                </span>
            </div>
            {postParticipationError[post.id] && (
                <p className="text-red-500 text-sm mt-4">エラーが発生しました。もう一度お試しください。</p>
            )}
            {fetchPostsError && (
                <p className="text-red-500 text-sm mt-4">プロジェクトの取得に失敗しました。もう一度お試しください。</p>
            )}
            {fetchStatusError && (
                <p className="text-red-500 text-sm mt-4">ステータスの取得に失敗しました。もう一度お試しください。</p>
            )}
            <ActionButtonForPost post={post} userId={userId} participationStatus={participationStatus} handleParticipation={handleParticipation} />
        </div>
    )
}
export default PostCard;