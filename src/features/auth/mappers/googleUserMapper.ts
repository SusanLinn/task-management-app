import type {
    AppUser,
} from "@/types/auth";

import type {
    GoogleTokenPayload,
} from "../types/googleAuth";


export const mapGoogleUserToAppUser =
    (
        googleUser:
            GoogleTokenPayload
    ): AppUser => {

        const now =
            new Date()
                .toISOString();


        return {
            id:
                crypto.randomUUID(),

            provider:
                "google",

            providerUserId:
                googleUser.sub,

            name:
                googleUser.name,

            email:
                googleUser.email
                    .toLowerCase(),

            avatar:
                googleUser.picture,

            createdAt:
                now,

            updatedAt:
                now,
        };
    };