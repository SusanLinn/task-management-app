import {
    createUser,
    findUserByProvider,
} from "@/db/repositories/userRepository";

import type {
    AppUser,
} from "@/types/auth";

import {
    importInitialDummyJsonTasks,
} from "@/features/tasks/services/taskImportService";

import {
    mapDummyJsonUserToAppUser,
} from "../mappers/dummyJsonUserMapper";

import type {
    LocalLoginData,
    LoginData,
    SignupData,
} from "../schemas/authSchemas";

import {
    loginWithDummyJson,
} from "./dummyJsonAuthService";

import {
    createLocalAccount,
    loginWithLocalAccount,
} from "./localAuthService";

import {
    mapGoogleUserToAppUser,
} from "../mappers/googleUserMapper";

import {
    decodeGoogleCredential,
} from "./googleAuthService";

export const authenticateWithDummyJson =
    async (
        loginData:
            LoginData
    ): Promise<AppUser> => {

        const dummyJsonUser =
            await loginWithDummyJson(
                loginData
            );


        let appUser =
            await findUserByProvider(
                "dummyjson",
                String(
                    dummyJsonUser.id
                )
            );


        if (!appUser) {

            appUser =
                mapDummyJsonUserToAppUser(
                    dummyJsonUser
                );


            await createUser(
                appUser
            );
        }


        return importInitialDummyJsonTasks(
            appUser
        );
    };


export const registerWithLocalAccount =
    async (
        signupData:
            SignupData
    ) => {

        return createLocalAccount(
            signupData
        );
    };


export const authenticateWithLocalAccount =
    async (
        loginData:
            LocalLoginData
    ) => {

        return loginWithLocalAccount(
            loginData
        );
    };


export const authenticateWithGoogle =
    async (
        credential:
            string
    ): Promise<AppUser> => {

        const googleUser =
            decodeGoogleCredential(
                credential
            );


        const existingUser =
            await findUserByProvider(
                "google",
                googleUser.sub
            );


        if (existingUser) {
            return existingUser;
        }


        const appUser =
            mapGoogleUserToAppUser(
                googleUser
            );


        await createUser(
            appUser
        );


        return appUser;
    };