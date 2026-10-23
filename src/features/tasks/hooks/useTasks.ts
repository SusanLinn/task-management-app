import {
    useQuery,
} from "@tanstack/react-query";

import {
    getUserTasks,
} from "../services/taskService";


export const useTasks =
    (
        ownerId:
            string
    ) => {

        return useQuery({
            queryKey: [
                "tasks",
                ownerId,
            ],

            queryFn:
                () =>
                    getUserTasks(
                        ownerId
                    ),

            enabled:
                Boolean(
                    ownerId
                ),
        });
    };