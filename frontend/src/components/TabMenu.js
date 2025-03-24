import { TrashIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { format } from "date-fns";
const TAB_RECRUITING = "recruiting";
const TAB_PARTICIPATING = "participating";
const TAB_PENDING = "pending";

const TabMenu = (
    { activeTab,
        handleTabChange,
        handleEdit,
        handleDelete,
        currentList,
        handleConfirmParticipations,
        handleConfirmParticipationRequest,
        loading,
        error,
        isOwner }) => {
    if (isOwner) {
        return (
            <div>
                <nav className="flex space-x-4 border-b">
                    <button
                        className={`pb-2 ${activeTab === TAB_RECRUITING ? "text-gray-700 pb-2 border-b-2 border-blue-500 focus:outline-none" : ""
                            }`}
                        onClick={() => handleTabChange(TAB_RECRUITING)}
                    >
                        募集中のプロジェクト
                    </button>
                    <button
                        className={`pb-2 ${activeTab === TAB_PARTICIPATING ? "text-gray-700 pb-2 border-b-2 border-blue-500 focus:outline-none" : ""
                            }`}
                        onClick={() => handleTabChange(TAB_PARTICIPATING)}
                    >
                        参加しているプロジェクト
                    </button>
                    <button
                        className={`pb-2 ${activeTab === TAB_PENDING ? "text-gray-700 pb-2 border-b-2 border-blue-500 focus:outline-none" : ""
                            }`}
                        onClick={() => handleTabChange(TAB_PENDING)}
                    >
                        参加申請中のプロジェクト
                    </button>
                </nav>
                {loading && <p>読み込み中...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="mt-4">
                    {currentList.length === 0 && !loading && !error ? (
                        <div className="mt-16 flex flex-col items-center justify-center text-gray-500">
                            {activeTab === TAB_RECRUITING ? (
                                <p className="text-xl">募集中のプロジェクトはありません<br />何か投稿してみましょう！</p>
                            ) : (
                                <p className="text-xl">該当するプロジェクトはありません<br />何か参加してみましょう！</p>
                            )}
                            <img
                                src="/images/got-an-idea.svg"
                                alt="No articles illustration"
                                className="mb-4 w-64 h-auto"
                            />
                        </div>
                    ) : (
                        <div className="w-full sm:w-[40rem] mx-auto grid gap-6">

                            {currentList.map((post) => (
                                <div key={post.id} className="bg-white p-6 rounded-2xl shadow-lg relative">
                                    <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                                    <p className="text-gray-600 mt-2 whitespace-pre-wrap">{post.description}</p>
                                    <div className="mt-4">
                                        <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full mr-2">
                                            #{post.category}
                                        </span>
                                    </div>
                                    <span className="absolute bottom-1 right-3 text-sm text-gray-400" >
                                        投稿日時: {format(new Date(post.created_at), "yyyy/MM/dd/HH:mm")}
                                    </span>
                                    {activeTab === TAB_RECRUITING && (
                                        <div className="mt-4 flex space-x-2">
                                            <button
                                                onClick={() => handleConfirmParticipations(post.id, "approved")}
                                                className="bg-secondary text-white px-4 py-3 rounded-full hover:bg-tertiary transition-colors duration-300"
                                            >
                                                参加者確認
                                            </button>
                                            <button
                                                onClick={() => handleConfirmParticipationRequest(post.id, "pending")}
                                                className="bg-secondary text-white px-4 py-3 rounded-full hover:bg-tertiary transition-colors duration-300"
                                            >
                                                参加申請確認
                                            </button>

                                            <button
                                                onClick={() => handleEdit(post)}
                                                className="absolute top-2 right-8 text-gray-400 hover:text-tertiary transition-colors duration-300"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="absolute top-2 right-3 text-gray-400 hover:text-red-500 transition-colors duration-300"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
    // 他人のプロフィールページの場合
    return (
        <div>
            <nav className="flex space-x-4 border-b">
                <button
                    className={`pb-2 ${activeTab === TAB_RECRUITING ? "text-gray-700 pb-2 border-b-2 border-blue-500 focus:outline-none" : ""
                        }`}
                    onClick={() => handleTabChange(TAB_RECRUITING)}
                >
                    募集中のプロジェクト
                </button>
                <button
                    className={`pb-2 ${activeTab === TAB_PARTICIPATING ? "text-gray-700 pb-2 border-b-2 border-blue-500 focus:outline-none" : ""
                        }`}
                    onClick={() => handleTabChange(TAB_PARTICIPATING)}
                >
                    参加しているプロジェクト
                </button>
            </nav>
            {loading && <p>読み込み中...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="mt-4">
                {currentList.length === 0 && !loading && !error ? (
                    <div className="mt-16 flex flex-col items-center justify-center text-gray-500">
                        {activeTab === TAB_RECRUITING ? (
                            <p className="text-xl">募集中のプロジェクトはありません</p>
                        ) : (
                            <p className="text-xl">該当するプロジェクトはありません</p>
                        )}
                    </div>
                ) : (
                    <div className="min-w-[18rem] sm:w-[18rem] md:w-[28rem] lg:w-[40rem] mx-auto grid gap-6">
                        {currentList.map((post) => (
                            <div key={post.id} className="bg-white p-6 rounded-2xl shadow-lg relative">
                                <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                                <p className="text-gray-600 mt-2">{post.description}</p>
                                <div className="mt-4">
                                    <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full mr-2">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default TabMenu;