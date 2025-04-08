const CreatePostModal = ({
    closeModal,
    title,
    setTitle,
    description,
    setDescription,
    category,
    setCategory,
    handleSubmitPost,
    createPostError,
    errors,
    values,
    setValues,
    isFormValid
}) => {

    return (
        <form onSubmit={handleSubmitPost}>
            <div
                className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            >
                <div
                    className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">新規投稿</h2>

                    <label className="block mb-2 text-gray-700" htmlFor="title">
                        タイトル
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setValues(prev => ({ ...prev, "title": e.target.value }));
                            setTitle(e.target.value);
                        }}
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mb-4">タイトルを入力してください</p>
                    )}

                    <label className="block mb-2 text-gray-700" htmlFor="description">
                        詳細
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => {
                            setValues(prev => ({ ...prev, "description": e.target.value }));
                            setDescription(e.target.value);
                        }}
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mb-4">詳細は10文字以上入力してください</p>
                    )}

                    <label className="block mb-2 text-gray-700" htmlFor="category">
                        カテゴリ
                    </label>
                    <input
                        id="category"
                        type="text"
                        value={category}
                        onChange={(e) => {
                            setValues(prev => ({ ...prev, "category": e.target.value }));
                            setCategory(e.target.value);
                        }}
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.category && (
                        <p className="text-red-500 text-sm mb-4">カテゴリを入力してください</p>
                    )}

                    {createPostError && (
                        <p className="text-red-500 text-sm mb-4">エラーが発生しました。もう一度お試しください。</p>
                    )}
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="mr-2 px-4 py-2 rounded bg-gray-300 text-gray-800 hover:opacity-90"
                        >
                            キャンセル
                        </button>
                        {isFormValid ? (
                            <button
                                type="submit"
                                className="px-4 py-2 rounded bg-secondary text-white font-semibold hover:opacity-90"
                            >
                                投稿
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled
                                className="px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold"
                            >
                                投稿
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}
export default CreatePostModal;