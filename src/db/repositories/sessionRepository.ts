import {
    getDatabase,
} from "../indexedDb/database";

import type {
    AuthSession,
} from "../../types/auth";


const CURRENT_SESSION_ID =
    "current-session";


export const saveSession =
    async (
        userId: string
    ) => {

        const database =
            await getDatabase();

        const session:
            AuthSession = {

            id:
                CURRENT_SESSION_ID,

            userId,

            createdAt:
                new Date()
                    .toISOString(),
        };


        await database.put(
            "sessions",
            session
        );

        return session;
    };


export const getSession =
    async () => {

        const database =
            await getDatabase();

        return database.get(
            "sessions",
            CURRENT_SESSION_ID
        );
    };


export const removeSession =
    async () => {

        const database =
            await getDatabase();

        await database.delete(
            "sessions",
            CURRENT_SESSION_ID
        );
    };