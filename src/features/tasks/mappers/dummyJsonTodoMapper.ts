import type {
    Task,
} from "../../../types/task";

import type {
    DummyJsonTodo,
} from "../schemas/dummyJsonTodoSchemas";


export const mapDummyJsonTodoToTask =
    (
        todo:
            DummyJsonTodo,

        ownerId:
            string,

        position:
            number
    ): Task => {

        const now =
            new Date()
                .toISOString();


        return {
            id:
                crypto.randomUUID(),

            ownerId,

            title:
                todo.todo,

            description:
                "",

            status:
                todo.completed
                    ? "DONE"
                    : "TODO",

            priority:
                "MEDIUM",

            position,

            createdAt:
                now,

            updatedAt:
                now,
        };
    };