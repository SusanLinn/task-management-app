import {
    createLocalAccountRecord,
    findLocalCredentialByUserId,
} from "@/db/repositories/localAuthRepository";

import {
    findUserByProvider,
} from "@/db/repositories/userRepository";

import type {
    AppUser,
    LocalCredential,
} from "@/types/auth";

import type {
    LocalLoginData,
    SignupData,
} from "../schemas/authSchemas";

import {
    createPasswordHash,
    verifyPassword,
} from "../utils/passwordUtils";


export const createLocalAccount =
    async (
        data:
            SignupData
    ): Promise<AppUser> => {

        const normalizedEmail =
            data.email
                .trim()
                .toLowerCase();


        const existingUser =
            await findUserByProvider(
                "local",
                normalizedEmail
            );


        if (existingUser) {

            throw new Error(
                "LOCAL_USER_EXISTS"
            );
        }


        const now =
            new Date()
                .toISOString();


        const user:
            AppUser = {

            id:
                crypto.randomUUID(),

            provider:
                "local",

            providerUserId:
                normalizedEmail,

            name:
                data.name
                    .trim(),

            email:
                normalizedEmail,

            createdAt:
                now,

            updatedAt:
                now,
        };


        const passwordData =
            await createPasswordHash(
                data.password
            );


        const credential:
            LocalCredential = {

            userId:
                user.id,

            passwordHash:
                passwordData
                    .passwordHash,

            passwordSalt:
                passwordData
                    .passwordSalt,

            iterations:
                passwordData
                    .iterations,

            createdAt:
                now,

            updatedAt:
                now,
        };


        await createLocalAccountRecord(
            user,
            credential
        );


        return user;
    };


export const loginWithLocalAccount =
    async (
        data:
            LocalLoginData
    ): Promise<AppUser> => {

        const normalizedEmail =
            data.email
                .trim()
                .toLowerCase();


        const user =
            await findUserByProvider(
                "local",
                normalizedEmail
            );


        if (!user) {

            throw new Error(
                "LOCAL_USER_NOT_FOUND"
            );
        }


        const credential =
            await findLocalCredentialByUserId(
                user.id
            );


        if (!credential) {

            throw new Error(
                "LOCAL_CREDENTIAL_NOT_FOUND"
            );
        }


        const isPasswordValid =
            await verifyPassword(
                data.password,
                credential
            );


        if (!isPasswordValid) {

            throw new Error(
                "INVALID_LOCAL_PASSWORD"
            );
        }


        return user;
    };