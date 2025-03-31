// src/hooks/useProfileImage.js
import { useState } from 'react';
import apiClient from '../api/apiClient';

export function useProfileImage(fetchMyProfile) {
    const [isUploading, setIsUploading] = useState(false);
    const [hasUploadError, setHasUploadError] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const uploadProfileImage = async (imageFile) => {
        // エラー状態をリセット
        setHasUploadError(false);
        setIsUploading(true);

        // FormDataの作成
        const formData = new FormData();
        formData.append('avatar', imageFile);

        try {
            await apiClient.post("/user/avatar", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                }
            });
            setIsUploading(false);
            setUploadProgress();
            await fetchMyProfile();
        } catch (error) {
            console.error('プロフィール画像のアップロードに失敗しました', error);
            setHasUploadError(true);
            setIsUploading(false);
            throw error;
        }
    };

    return {
        uploadProfileImage,
        isUploading,
        hasUploadError,
        uploadProgress
    };
}