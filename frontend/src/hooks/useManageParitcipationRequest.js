import { useState } from "react";
import apiClient from "../api/apiClient";

export function useManageParitcipationRequest() {
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showParticipationModal, setShowParticipationModal] = useState(false);
    const [requests, setRequests] = useState({});
    const [requestLoading, setRequestLoading] = useState(false);
    const [fetchRequestError, setFetchRequestError] = useState(null);
    const [paritcipations, setParitcipations] = useState({});
    const [paritcipationsLoading, setParitcipationsLoading] = useState(false);
    const [fetchParitcipationsError, setFetchParitcipationsError] = useState(null);

    const fetchParticipationRequests = async (postId, status) => {
        try {
            setRequestLoading(true);
            const response = await apiClient.get("/participationRecords", {
                params: {
                    postId,
                    status
                }
            });
            if (response.data.participationRecords.length === 0) {
                setRequests({});
                return;
            }
            const Users = [];
            response.data.participationRecords.forEach((p) => {
                Users.push(p.user);
            });
            setRequests({ "postId": postId, "users": Users });
        } catch (error) {
            console.log(error);
            setFetchRequestError(true);
        } finally {
            setRequestLoading(false);
            setFetchRequestError(false);
        }
    }

    const fetchParticipations = async (postId, status) => {
        try {
            setParitcipationsLoading(true);
            const response = await apiClient.get("/participationRecords", {
                params: {
                    postId,
                    status
                }
            });
            if (response.data.participationRecords.length === 0) {
                setParitcipations({});
                return;
            }
            const Users = [];
            response.data.participationRecords.forEach((p) => {
                Users.push(p.user);
            });
            setParitcipations({ "postId": postId, "users": Users });
        } catch (error) {
            console.log(error);
            setFetchRequestError(true);
        } finally {
            setParitcipationsLoading(false);
            setFetchParitcipationsError(false);
        }
    }

    const handleConfirmParticipationRequest = async (postId, status) => {
        setShowRequestModal(true);
        await fetchParticipationRequests(postId, status);
    }

    const handleConfirmParticipations = async (postId, status) => {
        setShowParticipationModal(true);
        await fetchParticipations(postId, status);
    }

    const handleApproveParticipation = async (postId, userId) => {
        try {
            await apiClient.patch(`/participation/${userId}/${postId}/approved`);
        }
        catch (error) {
            setFetchRequestError(error);
        } finally {
            setRequestLoading(false);
            fetchParticipationRequests(postId, "pending");
        }
    }

    const handleRejectParticipation = async (postId, userId) => {
        try {
            await apiClient.patch(`/participation/${userId}/${postId}/rejected`);
        }
        catch (error) {
            setFetchRequestError(error);
        } finally {
            setRequestLoading(false);
            fetchParticipationRequests(postId, "pending");
        }
    }

    const closeRequestModal = () => {
        setShowRequestModal(false);
    }

    const closeParticipationModal = () => {
        setShowParticipationModal(false);
    }
    return {
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
    }
}
