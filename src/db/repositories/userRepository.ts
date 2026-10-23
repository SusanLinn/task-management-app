import {
    getDatabase,
} from "../indexedDb/database";

import type {
    AppUser,
    AuthProvider,
} from "../../types/auth";


export const createUser =
    async (
        user: AppUser
    ) => {

        const database =
            await getDatabase();

        await database.put(
            "users",
            user
        );

        return user;
    };


export const updateUser =
    async (
        user: AppUser
    ) => {

        const database =
            await getDatabase();

        await database.put(
            "users",
            user
        );

        return user;
    };


export const findUserById =
    async (
        userId: string
    ) => {

        const database =
            await getDatabase();

        return database.get(
            "users",
            userId
        );
    };


export const findUserByProvider =
    async (
        provider:
            AuthProvider,

        providerUserId:
            string
    ) => {

        const database =
            await getDatabase();

        return database.getFromIndex(
            "users",
            "by-provider-user",
            [
                provider,
                providerUserId,
            ]
        );
    };