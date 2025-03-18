import React from "react";

const DeleteConfirmationModal = ({ isOpen, postId, deletePostError, closeModal, handleDeletePost }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold text-gray-800">削除確認</h2>
                <p className="mt-4 text-gray-600">本当に削除しますか？</p>
                {deletePostError && (
                    <p className="text-red-500 text-sm mb-4">エラーが発生しました。もう一度お試しください。</p>
                )}
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={() => handleDeletePost(postId)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-reject transition"
                    >
                        削除する
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
