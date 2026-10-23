import dummyJsonApi
    from "../../../services/api/dummyJsonApi";

import {
    dummyJsonTodosResponseSchema,
} from "../schemas/dummyJsonTodoSchemas";


export const getDummyJsonTodosByUser =
    async (
        userId:
            string
    ) => {

        const response =
            await dummyJsonApi.get(
                `/todos/user/${userId}`
            );


        const result =
            dummyJsonTodosResponseSchema
                .parse(
                    response.data
                );


        return result.todos;
    };