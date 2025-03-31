import { useNavigate } from "react-router-dom";
import ActionButtonForPost from "./ActionButtonForPost";
import { format } from "date-fns";

const PostCard = ({
    post,
    userId,
    participationStatus,
    handleParticipation,
    postParticipationError,
    fetchPostsError,
    fetchStatusError,
    isGuest
}) => {
    const navigate = useNavigate();

    const handleNavigateToProfile = () => {
        navigate(`/profile/${post.user.id}`);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg relative">
            <div className="flex items-center mb-4 cursor-pointer" onClick={handleNavigateToProfile}>
                <img
                    src={post.user.userProfile.avatar_url || '/images/default_avatar_image.png'}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <span className="ml-2 text-blue-600 hover:underline">
                    {post.user.userProfile.username}
                </span>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mt-2">{post.title}</h2>

            <p className="text-gray-600 mt-2 whitespace-pre-wrap">{post.description}</p>

            <div className="mt-4">
                <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full mr-2">
                    #{post.category}
                </span>
            </div>

            <span className="absolute bottom-1 right-3 text-sm text-gray-400">
                投稿日時: {format(new Date(post.created_at), "yyyy/MM/dd/HH:mm")}
            </span>

            {postParticipationError[post.id] && (
                <p className="text-red-500 text-sm mt-4">エラーが発生しました。もう一度お試しください。</p>
            )}
            {fetchPostsError && (
                <p className="text-red-500 text-sm mt-4">プロジェクトの取得に失敗しました。もう一度お試しください。</p>
            )}
            {fetchStatusError && (
                <p className="text-red-500 text-sm mt-4">ステータスの取得に失敗しました。もう一度お試しください。</p>
            )}

            <ActionButtonForPost
                post={post}
                userId={userId}
                participationStatus={participationStatus}
                handleParticipation={handleParticipation}
                isGuest={isGuest}
            />
        </div>
    );
};

export default PostCard;