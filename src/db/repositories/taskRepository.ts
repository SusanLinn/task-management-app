import {
    getDatabase,
} from "../indexedDb/database";

import type {
    Task,
} from "../../types/task";


export const createTask =
    async (
        task:
            Task
    ) => {

        const database =
            await getDatabase();

        await database.put(
            "tasks",
            task
        );

        return task;
    };


export const createTasks =
    async (
        tasks:
            Task[]
    ) => {

        const database =
            await getDatabase();

        const transaction =
            database.transaction(
                "tasks",
                "readwrite"
            );


        for (
            const task
            of tasks
        ) {

            await transaction.store
                .put(
                    task
                );
        }


        await transaction.done;

        return tasks;
    };


export const updateTasks =
    async (
        tasks:
            Task[]
    ) => {

        const database =
            await getDatabase();

        const transaction =
            database.transaction(
                "tasks",
                "readwrite"
            );


        for (
            const task
            of tasks
        ) {

            await transaction.store
                .put(
                    task
                );
        }


        await transaction.done;

        return tasks;
    };


export const getTasksByOwner =
    async (
        ownerId:
            string
    ) => {

        const database =
            await getDatabase();

        return database
            .getAllFromIndex(
                "tasks",
                "by-owner",
                ownerId
            );
    };


export const updateTask =
    async (
        task:
            Task
    ) => {

        const database =
            await getDatabase();

        await database.put(
            "tasks",
            task
        );

        return task;
    };


export const deleteTask =
    async (
        taskId:
            string
    ) => {

        const database =
            await getDatabase();

        await database.delete(
            "tasks",
            taskId
        );
    };