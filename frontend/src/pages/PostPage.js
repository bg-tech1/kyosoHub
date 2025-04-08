import Footer from "../components/Footer";
import Header from "../components/Header";
import CreatePostModal from "../components/CreatePostModal";
import PostCard from "../components/PostCard";
import { useCreatePost } from "../hooks/useCreatePost";
import { useMyProfile } from "../hooks/useMyProfile";
import { useGetAllPosts } from "../hooks/useGetAllPosts";
import { useGetParticipationStatus } from "../hooks/useGetParticipationStatus";
import { useRegisterParticipation } from "../hooks/useRegisterParticipation";
import { usePagination } from "../hooks/usePagination";
import { useSearchPosts } from "../hooks/useSearchPosts";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../hooks/useAuth";
import useFormValidation from "../hooks/useFormValidation";
import { useMemo } from "react";

const PostPage = () => {

    const initialValues = useMemo(() => ({
        "title": "",
        "description": "",
        "category": ""
    }), []);

    const validationRules = useMemo(() => ({
        title: "^[\\p{L}\\p{N}\\p{P}\\p{S}\\s]{1,}$",
        category: "^[\\p{L}\\p{N}\\p{P}\\p{S}\\s]{1,}$",
        description: "^[\\p{L}\\p{N}\\p{P}\\p{S}\\s]{10,}$"
    }), []);

    const {
        isGuest
    } = useAuth();

    const {
        userProfile,
    } = useMyProfile();

    const {
        posts,
        fetchAllPosts,
        loadingPosts,
        fetchPostsError
    } = useGetAllPosts();

    const {
        showModal,
        openModal,
        closeModal,
        title,
        setTitle,
        description,
        setDescription,
        category,
        setCategory,
        createPostError,
        handleSubmitPost } = useCreatePost({ fetchAllPosts, isGuest });

    const {
        searchTerm,
        setSearchTerm,
        filteredPosts,
        handleSearch
    } = useSearchPosts(posts);

    const {
        participationStatus,
        fetchParticipationStatus,
        loadingStatus,
        fetchStatusError
    } = useGetParticipationStatus(posts);

    const {
        handleParticipation,
        participationError
    } = useRegisterParticipation(fetchParticipationStatus);

    const {
        currentPage,
        totalPages,
        currentItems,
        handleNextPage,
        handlePrevPage
    } = usePagination(filteredPosts, 5);

    const {
        errors,
        values,
        setValues,
        isFormValid
    } = useFormValidation(initialValues, validationRules)


    if (!userProfile || !posts || !filteredPosts || !participationStatus || loadingPosts || loadingStatus) {
        return <div>ローディング中</div>;
    }
    return (
        <div className="flex flex-col min-h-screen bg-primary">
            <Header />
            <div className="mt-6 min-h-screen flex flex-col justify-start items-center relative">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">募集中のプロジェクト</h1>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
                {filteredPosts.length === 0 ? (
                    <div className="text-gray-500 mt-6">該当する投稿が見つかりませんでした。</div>
                ) : (
                    <div className="w-full sm:w-[40rem] mx-auto grid gap-6">
                        {currentItems.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                userId={userProfile.user_id}
                                participationStatus={participationStatus}
                                handleParticipation={handleParticipation}
                                postParticipationError={participationError}
                                fetchPostsError={fetchPostsError}
                                fetchStatusError={fetchStatusError}
                                isGuest={isGuest}
                            />
                        ))}
                    </div>
                )}
                <div className="flex items-center justify-center mt-4">
                    {currentPage > 1 && (
                        <button
                            onClick={handlePrevPage}
                            className="px-4 py-2 mx-2 rounded bg-secondary text-white font-semibold hover:opacity-90 transition-opacity"
                        >
                            前のページ
                        </button>
                    )}
                    {currentPage < totalPages && (
                        <button
                            onClick={handleNextPage}
                            className="px-4 py-2 mx-2 rounded bg-secondary text-white font-semibold hover:opacity-90 transition-opacity"
                        >
                            次のページ
                        </button>
                    )}
                </div>
                <button
                    onClick={openModal}
                    className="fixed bottom-4 right-4 px-4 py-2 rounded-full bg-secondary text-white font-semibold shadow-md hover:opacity-90 transition-opacity"
                >
                    新規投稿
                </button>
            </div>
            <Footer />
            {
                showModal &&
                <CreatePostModal
                    closeModal={closeModal}
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    category={category}
                    setCategory={setCategory}
                    handleSubmitPost={handleSubmitPost}
                    createPostError={createPostError}
                    isGuest={isGuest}
                    errors={errors}
                    values={values}
                    setValues={setValues}
                    isFormValid={isFormValid}
                />
            }
        </div >
    );
};

export default PostPage;
