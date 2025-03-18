import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

export function useGetParticipationStatus(posts) {
    const [participationStatus, setParticipationStatus] = useState({});
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [fetchStatusError, setFetchStatusError] = useState(false);
    useEffect(() => {
        if (posts) {
            fetchParticipationStatus();
        }
    }, [posts]);
    const fetchParticipationStatus = async () => {
        try {
            setLoadingStatus(true);
            const res = await apiClient.get("/participationRecords", {
                params: {
                    status: "any"
                },
            });
            const status = {};
            res.data.participationRecords.forEach((p) => {
                if (p.status === "pending") {
                    status[p.post_id] = "pending";
                } else if (p.status === "approved") {
                    status[p.post_id] = "approved";
                } else if (p.status === "rejected") {
                    status[p.post_id] = "rejected";
                } else {
                    status[p.post_id] = "";
                }
            });
            setParticipationStatus(status);
        } catch (err) {
            console.error(err);
            setFetchStatusError(true);
        } finally {
            setLoadingStatus(false);
            setFetchStatusError(false);
        }
    };
    return {
        participationStatus, fetchParticipationStatus, loadingStatus, fetchStatusError
    };
}