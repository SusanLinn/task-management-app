import type {
    AppUser,
} from "../../../types/auth";

import type {
    DummyJsonLoginResponse,
} from "../schemas/authSchemas";


export const mapDummyJsonUserToAppUser =
    (
        user:
            DummyJsonLoginResponse
    ): AppUser => {

        const now =
            new Date()
                .toISOString();


        return {
            id:
                crypto.randomUUID(),

            provider:
                "dummyjson",

            providerUserId:
                String(
                    user.id
                ),

            name:
                `${user.firstName} ${user.lastName}`,

            email:
                user.email,

            avatar:
                user.image,

            createdAt:
                now,

            updatedAt:
                now,
        };
    };