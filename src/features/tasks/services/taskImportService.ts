import {
    createTasks,
} from "../../../db/repositories/taskRepository";

import {
    updateUser,
} from "../../../db/repositories/userRepository";

import type {
    AppUser,
} from "../../../types/auth";

import {
    mapDummyJsonTodoToTask,
} from "../mappers/dummyJsonTodoMapper";

import {
    getDummyJsonTodosByUser,
} from "./dummyJsonTodoService";


export const importInitialDummyJsonTasks =
    async (
        user:
            AppUser
    ): Promise<AppUser> => {

        if (
            user.provider !==
            "dummyjson"
        ) {
            return user;
        }


        if (
            user.initialTasksImported
        ) {
            return user;
        }


        const todos =
            await getDummyJsonTodosByUser(
                user.providerUserId
            );


        const tasks =
            todos.map(
                (
                    todo,
                    index
                ) =>
                    mapDummyJsonTodoToTask(
                        todo,
                        user.id,
                        index
                    )
            );


        await createTasks(
            tasks
        );


        const updatedUser:
            AppUser = {
            ...user,

            initialTasksImported:
                true,

            updatedAt:
                new Date()
                    .toISOString(),
        };


        await updateUser(
            updatedUser
        );


        return updatedUser;
    };