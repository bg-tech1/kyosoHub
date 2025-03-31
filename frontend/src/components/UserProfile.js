import { CakeIcon } from '@heroicons/react/24/outline'
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const UserProfile = ({
    userProfile,
    postCount,
    paritcipationsCount,
    handleEditProfile,
    fetchMyProfileError,
    isOwner,
    uploadProfileImage,
    isUploading,
    hasUploadError,
    uploadProgress
}) => {
    return (
        <div className="flex flex-col items-center md:flex-row md:justify-start md:items-start">
            <div className="relative">
                <img
                    src={userProfile.avatar_url || '/images/default_avatar_image.png'}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full object-cover border border-gray-300"
                />
                {isOwner && (
                    <label className="absolute bottom-0 right-0 bg-gray-300 text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-gray-400">
                        <PencilSquareIcon className="w-5 h-5" />
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    uploadProfileImage(file);
                                }
                            }}
                        />
                    </label>
                )}
                {isUploading && (
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <div className="text-white">アップロード中...</div>
                    </div>
                )}
                {hasUploadError && (
                    <div className="absolute top-0 left-0 w-full h-full bg-red-500 bg-opacity-50 flex items-center justify-center">
                        <div className="text-white">アップロードに失敗しました</div>
                    </div>
                )}
                {uploadProgress > 0 && (
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <div className="text-white">{uploadProgress}%</div>
                    </div>
                )}
            </div>

            <div className="mt-4 md:mt-0 md:ml-24">
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
                <div className="mt-4 md:mt-0 md:ml-auto">
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
