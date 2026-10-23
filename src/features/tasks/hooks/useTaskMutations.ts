import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import type {
    Task,
} from "../../../types/task";

import type {
    TaskFormData,
} from "../schemas/taskSchemas";

import {
    createUserTask,
    deleteUserTask,
    saveTaskOrder,
    updateUserTask,
} from "../services/taskService";


export const useTaskMutations =
    (
        ownerId:
            string
    ) => {

        const queryClient =
            useQueryClient();


        const refreshTasks =
            async () => {

                await queryClient
                    .invalidateQueries({
                        queryKey: [
                            "tasks",
                            ownerId,
                        ],
                    });
            };


        const createTaskMutation =
            useMutation({
                mutationFn:
                    (
                        data:
                            TaskFormData
                    ) =>
                        createUserTask(
                            ownerId,
                            data
                        ),

                onSuccess:
                    refreshTasks,
            });


        const updateTaskMutation =
            useMutation({
                mutationFn:
                    ({
                        task,
                        data,
                    }: {
                        task:
                            Task;

                        data:
                            TaskFormData;
                    }) =>
                        updateUserTask(
                            task,
                            data
                        ),

                onSuccess:
                    refreshTasks,
            });


        const deleteTaskMutation =
            useMutation({
                mutationFn:
                    deleteUserTask,

                onSuccess:
                    refreshTasks,
            });


        const reorderTasksMutation =
            useMutation({
                mutationFn:
                    saveTaskOrder,

                onSuccess:
                    refreshTasks,

                onError:
                    refreshTasks,
            });


        return {
            createTaskMutation,
            updateTaskMutation,
            deleteTaskMutation,
            reorderTasksMutation,
        };
    };