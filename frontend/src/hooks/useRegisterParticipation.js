import { useState } from "react";
import apiClient from "../api/apiClient";

export function useRegisterParticipation(fetchParticipationStatus) {
    const [participationError, setParticipationError] = useState({});
    const [loadingParticipation, setLoadingParticipation] = useState(false);
    const handleParticipation = async (postId) => {
        try {
            setLoadingParticipation(true);
            await apiClient.post(`/participation`, {
                post_id: postId,
            });
            await fetchParticipationStatus();
            setParticipationError({});
        } catch (error) {
            setParticipationError({ [postId]: true });
            console.error(error);
        } finally {
            setLoadingParticipation(false);
        }
    };
    return {
        handleParticipation, loadingParticipation, participationError
    };
}