const ProfileFormModal = ({
    isOpen,
    closeModal,
    username,
    setUsername,
    gender,
    setGender,
    birthdate,
    setBirthdate,
    bio,
    setBio,
    handleSubmitUserProfile
}) => {
    if (!isOpen) return null;
    return (
        <form onSubmit={handleSubmitUserProfile}>
            <div
                className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                onClick={closeModal}
            >
                <div
                    className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">プロフィールを編集</h2>

                    <label className="block mb-2 text-gray-700" htmlFor="username">
                        名前（必須）
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                    <label className="block mb-2 text-gray-700" htmlFor="gender">
                        性別（オプション）
                    </label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="">選択してください</option>
                        <option value="男性">男性</option>
                        <option value="女性">女性</option>
                        <option value="回答しない">回答しない</option>
                    </select>
                    <label className="block mb-2 text-gray-700" htmlFor="birthdate">
                        生年月日（オプション）
                    </label>
                    <input
                        id="birthdate"
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <label className="block mb-2 text-gray-700" htmlFor="bio">
                        自己紹介（必須）
                    </label>
                    <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                        rows="5"
                        required
                    />

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
                            変更する
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
export default ProfileFormModal;