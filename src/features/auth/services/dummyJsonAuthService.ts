import dummyJsonApi
    from "../../../services/api/dummyJsonApi";

import {
    dummyJsonLoginResponseSchema,
    type DummyJsonLoginResponse,
    type LoginData,
} from "../schemas/authSchemas";


export const loginWithDummyJson =
    async (
        loginData:
            LoginData
    ): Promise<
        DummyJsonLoginResponse
    > => {

        const response =
            await dummyJsonApi.post(
                "/auth/login",
                loginData
            );


        return dummyJsonLoginResponseSchema
            .parse(
                response.data
            );
    };