const EditPostModal = ({ isOpen, postId, title, setTitle, description, setDescription, category, setCategory, updatePostError, closeModal, handleUpdatePost }) => {

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full sm:w-[30rem]">
                <form onSubmit={() => { handleUpdatePost(postId, title, description, category) }}>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                    >
                        <div
                            className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">プロジェクトを編集</h2>

                            <label className="block mb-2 text-gray-700" htmlFor="title">
                                タイトル
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />

                            <label className="block mb-2 text-gray-700" htmlFor="description">
                                詳細
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />

                            <label className="block mb-2 text-gray-700" htmlFor="category">
                                カテゴリ
                            </label>
                            <input
                                id="category"
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                            {updatePostError && (
                                <p className="text-red-500 text-sm mb-4">エラーが発生しました。もう一度お試しください。</p>
                            )}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="mr-2 px-4 py-2 rounded bg-gray-300 text-gray-800 hover:opacity-90"
                                >
                                    キャンセル
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-secondary text-white font-semibold hover:opacity-90"
                                >
                                    更新
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default EditPostModal;