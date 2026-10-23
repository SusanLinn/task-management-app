import {
    getDatabase,
} from "../indexedDb/database";

import type {
    AppUser,
    LocalCredential,
} from "../../types/auth";


export const createLocalAccountRecord =
    async (
        user:
            AppUser,

        credential:
            LocalCredential
    ) => {

        const database =
            await getDatabase();


        const transaction =
            database.transaction(
                [
                    "users",
                    "localCredentials",
                ],
                "readwrite"
            );


        await transaction
            .objectStore(
                "users"
            )
            .add(
                user
            );


        await transaction
            .objectStore(
                "localCredentials"
            )
            .add(
                credential
            );


        await transaction.done;


        return user;
    };


export const findLocalCredentialByUserId =
    async (
        userId:
            string
    ) => {

        const database =
            await getDatabase();


        return database.get(
            "localCredentials",
            userId
        );
    };