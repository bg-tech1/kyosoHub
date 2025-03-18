import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useUserProfile } from "../hooks/useUserProfile";
import TabMenu from "../components/TabMenu";
import { useUserPosts } from "../hooks/useUserPosts";
import UserProfile from "../components/UserProfile";

const UserProfilePage = () => {
    const { userId } = useParams();
    const { userProfile, loadingUser, errorUser } = useUserProfile(userId);
    const { postData, handleTabChange, activeTab, loading, error, postCount, paritcipationsCount } = useUserPosts(userId);

    if (loadingUser) return <div className="text-center text-gray-600">読み込み中...</div>;
    if (errorUser) return <div className="text-center text-red-500">{error}</div>;
    return (
        <div className="bg-primary min-h-screen">
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-8">
                {userProfile && (
                    <UserProfile userProfile={userProfile} postCount={postCount} paritcipationsCount={paritcipationsCount} isOwner={false} />
                )}
                <TabMenu
                    activeTab={activeTab}
                    handleTabChange={handleTabChange}
                    currentList={postData[activeTab]}
                    loading={loading}
                    error={error}
                    isOwner={false}
                />
            </main>
            <Footer />
        </div>
    );
};

export default UserProfilePage;
