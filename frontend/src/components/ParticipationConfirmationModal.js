import { useNavigate } from "react-router-dom";

const ParticipationConfirmationModal = ({ isOpen, paritcipations, paritcipationsLoading, fetchParitcipationsError, closeModal }) => {
    const hasParticipations = Object.keys(paritcipations).length > 0;
    const navigate = useNavigate();
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 w-96 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">参加者一覧</h2>
                {paritcipationsLoading ? (
                    <div>ローディング中...</div>
                ) : (
                    hasParticipations ? (
                        paritcipations["users"].map((user) => (
                            <div key={user.id} className="mb-4 flex justify-between items-center">
                                <h3 className="text-lg font-bold mb-2 text-blue-600 cursor-pointer hover:underline"
                                    onClick={() => navigate(`/profile/${user.id}`)}>
                                    {user.userProfile.username}さん
                                </h3>
                            </div>
                        ))
                    ) : (
                        <h3 className="text-lg font-bold text-gray-800 text-center">参加者はいません</h3>
                    )
                )}
                {fetchParitcipationsError && (
                    <div className="text-red-500 font-bold mt-4">エラーが発生しました</div>
                )}
                <div className="flex justify-center mt-12">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:opacity-90"
                    >
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ParticipationConfirmationModal;