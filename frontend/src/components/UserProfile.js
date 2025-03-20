import { CakeIcon } from '@heroicons/react/24/outline'
const UserProfile = ({
    userProfile,
    postCount,
    paritcipationsCount,
    handleEditProfile,
    fetchMyProfileError,
    isOwner
}) => {
    return (
        <div className="flex flex-col items-center md:flex-row md:space-x-6 md:justify-between md:items-start">
            <div className="mt-4 md:mt-0">
                <h1 className="text-2xl font-bold text-gray-700">{userProfile.username}</h1>
                <h2 className="text-md font-bold text-gray-700">
                    <CakeIcon className="w-5 h-5 text-gray-700 mr-2 inline-block" />
                    {userProfile.birthdate === '0001-01-01T00:00:00Z' ? '未回答' : userProfile.birthdate}
                </h2>
                <p className="text-gray-700 mt-1 whitespace-pre-wrap">{userProfile.bio || 'はじめまして、よろしくお願いします。'}</p>
                <div className="flex items-center text-gray-700 space-x-4 mt-1">
                    <span>募集{postCount}件</span>
                    <span>参加中{paritcipationsCount}件</span>
                </div>
                {fetchMyProfileError && (
                    <div className="text-red-500 font-bold mt-4">ユーザー情報の取得に失敗しました</div>
                )}
            </div>
            {isOwner && (
                <div className="mt-4 md:mt-0">
                    <button
                        onClick={handleEditProfile}
                        className="border border-gray-300 text-gray-700 px-4 py-1.5 rounded-md hover:bg-gray-100 transition"
                    >
                        Edit profile
                    </button>
                </div>
            )}
        </div>
    )
}

export default UserProfile;
