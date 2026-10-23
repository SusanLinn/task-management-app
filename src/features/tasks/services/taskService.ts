import {
    createTask,
    deleteTask,
    getTasksByOwner,
    updateTask,
    updateTasks,
} from "../../../db/repositories/taskRepository";

import type {
    Task,
} from "../../../types/task";

import type {
    TaskFormData,
} from "../schemas/taskSchemas";


export const getUserTasks =
    async (
        ownerId:
            string
    ): Promise<Task[]> => {

        const tasks =
            await getTasksByOwner(
                ownerId
            );


        return tasks.sort(
            (
                firstTask,
                secondTask
            ) =>
                firstTask.position -
                secondTask.position
        );
    };


export const createUserTask =
    async (
        ownerId:
            string,

        data:
            TaskFormData
    ) => {

        const now =
            new Date()
                .toISOString();


        const task:
            Task = {

            id:
                crypto.randomUUID(),

            ownerId,

            title:
                data.title,

            description:
                data.description,

            status:
                data.status,

            priority:
                data.priority,

            dueDate:
                data.dueDate ||
                undefined,

            position:
                Date.now(),

            createdAt:
                now,

            updatedAt:
                now,
        };


        return createTask(
            task
        );
    };


export const updateUserTask =
    async (
        task:
            Task,

        data:
            TaskFormData
    ) => {

        const updatedTask:
            Task = {

            ...task,

            title:
                data.title,

            description:
                data.description,

            status:
                data.status,

            priority:
                data.priority,

            dueDate:
                data.dueDate ||
                undefined,

            updatedAt:
                new Date()
                    .toISOString(),
        };


        return updateTask(
            updatedTask
        );
    };


export const deleteUserTask =
    async (
        taskId:
            string
    ) => {

        await deleteTask(
            taskId
        );
    };


export const saveTaskOrder =
    async (
        tasks:
            Task[]
    ) => {

        return updateTasks(
            tasks
        );
    };