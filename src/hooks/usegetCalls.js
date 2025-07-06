import { useEffect, useState } from "react"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useUser } from "@clerk/nextjs";

export const useGetCalls = () => {
    const [calls, setcalls] = useState([]);
    const [isLoading, setisLoading] = useState(false)
    const client = useStreamVideoClient();
    const { user } = useUser();

    useEffect(() => {
        const loadCalls = async () => {
            if (!client || !user?.id) return;
            setisLoading(true);

            try {
                const { calls } = await client.queryCalls({
                    sort: [{ field: 'starts_at', direction: -1 }],  // sort the meeting by when they were created.
                    filter_conditions: {
                        starts_at: { $exists: true },
                        $or: [
                            { created_by_user_id: user.id },
                            { members: { $in: [user.id]} },
                        ]
                    }
                });

                setcalls(calls);
            } catch (error) {
                console.log(error);
            } finally {
                setisLoading(false);
            }
        }

        loadCalls();

    }, [client, user?.id])

    const now = new Date();

    const endedCalls = calls.filter(({ state: {
        startsAt,
        endedAt
    }}) => {
        return (startsAt && new Date(startsAt) < now || !!endedAt)
    })
    const upcomingCalls = calls.filter(({ state: {
        startsAt
    }}) => {
        return (startsAt && new Date(startsAt) > now)
    })

    return {
        endedCalls,
        upcomingCalls,
        callRecordings: calls,
        isLoading,
    }
}