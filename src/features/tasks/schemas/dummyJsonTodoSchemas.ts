import {
    z,
} from "zod";


export const dummyJsonTodoSchema =
    z.object({
        id:
            z.number(),

        todo:
            z.string(),

        completed:
            z.boolean(),

        userId:
            z.number(),
    });


export const dummyJsonTodosResponseSchema =
    z.object({
        todos:
            z.array(
                dummyJsonTodoSchema
            ),

        total:
            z.number(),

        skip:
            z.number(),

        limit:
            z.number(),
    });


export type DummyJsonTodo =
    z.infer<
        typeof dummyJsonTodoSchema
    >;