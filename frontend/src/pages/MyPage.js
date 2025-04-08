import Header from "../components/Header";
import TabMenu from "../components/TabMenu";
import { useMyProfile } from "../hooks/useMyProfile";
import { useUserPosts } from "../hooks/useUserPosts";
import UserProfile from "../components/UserProfile";
import { useProfileForm } from "../hooks/useProfileForm";
import ProfileFormModal from "../components/ProfileFormModal";
import Footer from "../components/Footer";
import ParticipationRequestModal from "../components/ParticipationRequestModal";
import ParticipationConfirmationModal from "../components/ParticipationConfirmationModal";
import { useManagePost } from "../hooks/useManagePost";
import EditPostModal from "../components/EditPostModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { useManageParitcipationRequest } from "../hooks/useManageParitcipationRequest";
import { useProfileImage } from "../hooks/useProfileImage";
import { useAuth } from "../hooks/useAuth";
import useFormValidation from "../hooks/useFormValidation";
import { useMemo } from "react";

const MyPage = () => {
    const {
        isGuest
    } = useAuth();

    const {
        userProfile,
        fetchMyProfile,
        fetchMyProfileError
    } = useMyProfile();

    const {
        username,
        setUsername,
        gender,
        setGender,
        bio,
        setBio,
        birthdate,
        setBirthdate,
        showModal,
        handleEditProfile,
        closeModal,
        handleSubmitUserProfile,
        fetchUserProfileError
    } = useProfileForm(userProfile, fetchMyProfile, isGuest);

    const {
        uploadProfileImage,
        isUploading,
        hasUploadError,
        uploadProgress
    } = useProfileImage(fetchMyProfile);

    const {
        postData,
        handleTabChange,
        activeTab,
        loading,
        error,
        postCount,
        paritcipationsCount,
        fetchPostData
    } = useUserPosts();

    const {
        requests,
        requestLoading,
        fetchRequestError,
        paritcipations,
        paritcipationsLoading,
        fetchParitcipationsError,
        showRequestModal,
        showParticipationModal,
        closeRequestModal,
        closeParticipationModal,
        fetchParticipationRequests,
        handleConfirmParticipationRequest,
        handleConfirmParticipations,
        handleApproveParticipation,
        handleRejectParticipation
    } = useManageParitcipationRequest();

    const {
        postId,
        title,
        setTitle,
        description,
        setDescription,
        category,
        setCategory,
        updatePostError,
        deletePostError,
        showEditPostModal,
        handleEdit,
        showDeletePostModal,
        handleDelete,
        handleUpdatePost,
        handleDeletePost,
        closeEditPostModal,
        closeDeletePostModal
    } = useManagePost(fetchPostData, fetchParticipationRequests);

    const initialValues = useMemo(() => ({
        "title": title || "",
        "description": description || "",
        "category": category || ""
    }), [postId]);

    const validationRules = useMemo(() => ({
        title: "^[\\p{L}\\p{N}\\p{P}\\p{S}\\s]{1,}$",
        category: "^[\\p{L}\\p{N}\\p{P}\\p{S}\\s]{1,}$",
        description: "^[\\p{L}\\p{N}\\p{P}\\p{S}\\s]{10,}$"
    }), []);

    const {
        errors,
        values,
        setValues,
        isFormValid
    } = useFormValidation(initialValues, validationRules)
    if (!userProfile) {
        return <div>ユーザー情報が見つかりません</div>;
    }

    if (!postData) {
        return <div>プロジェクト情報が見つかりません</div>;
    }

    return (
        <div className="min-h-screen bg-primary">
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-8">
                <UserProfile
                    userProfile={userProfile}
                    postCount={postCount}
                    paritcipationsCount={paritcipationsCount}
                    handleEditProfile={handleEditProfile}
                    fetchMyProfileError={fetchMyProfileError}
                    isOwner={true}
                    uploadProfileImage={uploadProfileImage}
                    isUploading={isUploading}
                    hasUploadError={hasUploadError}
                    uploadProgress={uploadProgress}
                />
                <TabMenu
                    activeTab={activeTab}
                    handleTabChange={handleTabChange}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    currentList={postData[activeTab]}
                    handleConfirmParticipations={handleConfirmParticipations}
                    handleConfirmParticipationRequest={handleConfirmParticipationRequest}
                    loading={loading}
                    error={error}
                    isOwner={true}
                />
                <ProfileFormModal
                    isOpen={showModal}
                    username={username}
                    setUsername={setUsername}
                    gender={gender}
                    setGender={setGender}
                    birthdate={birthdate}
                    setBirthdate={setBirthdate}
                    bio={bio}
                    setBio={setBio}
                    closeModal={closeModal}
                    handleSubmitUserProfile={handleSubmitUserProfile}
                    fetchUserProfileError={fetchUserProfileError}
                />
                < ParticipationConfirmationModal
                    isOpen={showParticipationModal}
                    paritcipations={paritcipations}
                    paritcipationsLoading={paritcipationsLoading}
                    fetchParitcipationsError={fetchParitcipationsError}
                    closeModal={closeParticipationModal}
                />
                <ParticipationRequestModal
                    isOpen={showRequestModal}
                    requests={requests}
                    requestLoading={requestLoading}
                    fetchRequestError={fetchRequestError}
                    handleApproveParticipation={handleApproveParticipation}
                    handleRejectParticipation={handleRejectParticipation}
                    closeModal={closeRequestModal}
                />
                <EditPostModal
                    isOpen={showEditPostModal}
                    postId={postId}
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    category={category}
                    setCategory={setCategory}
                    updatePostError={updatePostError}
                    closeModal={closeEditPostModal}
                    handleUpdatePost={handleUpdatePost}
                    errors={errors}
                    values={values}
                    setValues={setValues}
                    isFormValid={isFormValid}
                />
                <DeleteConfirmationModal
                    isOpen={showDeletePostModal}
                    postId={postId}
                    deletePostError={deletePostError}
                    closeModal={closeDeletePostModal}
                    handleDeletePost={handleDeletePost}
                />
            </main>
            <Footer />
        </div>
    );
};

export default MyPage;
