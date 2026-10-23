import {
    jwtDecode,
} from "jwt-decode";

import type {
    GoogleTokenPayload,
} from "../types/googleAuth";


export const decodeGoogleCredential =
    (
        credential:
            string
    ) => {

        const payload =
            jwtDecode<
                GoogleTokenPayload
            >(
                credential
            );


        if (
            !payload.sub ||
            !payload.email ||
            !payload.name
        ) {
            throw new Error(
                "INVALID_GOOGLE_USER"
            );
        }


        return payload;
    };