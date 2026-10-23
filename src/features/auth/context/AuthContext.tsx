import {
    createContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type {
    AppUser,
} from "../../../types/auth";

import {
    findUserById,
} from "../../../db/repositories/userRepository";

import {
    getSession,
    removeSession,
    saveSession,
} from "../../../db/repositories/sessionRepository";


interface AuthContextValue {
    currentUser:
        AppUser | null;

    isAuthenticated:
        boolean;

    isAuthLoading:
        boolean;

    startSession:
        (
            user: AppUser
        ) => Promise<void>;

    logout:
        () => Promise<void>;
}


export const AuthContext =
    createContext<
        AuthContextValue | undefined
    >(undefined);


interface AuthProviderProps {
    children:
        ReactNode;
}


export const AuthProvider = ({
    children,
}: AuthProviderProps) => {

    const [
        currentUser,
        setCurrentUser,
    ] =
        useState<AppUser | null>(
            null
        );

    const [
        isAuthLoading,
        setIsAuthLoading,
    ] =
        useState(true);


    useEffect(
        () => {

            const restoreSession =
                async () => {

                    try {

                        const session =
                            await getSession();

                        if (!session) {
                            return;
                        }

                        const user =
                            await findUserById(
                                session.userId
                            );

                        if (!user) {

                            await removeSession();

                            return;
                        }

                        setCurrentUser(
                            user
                        );

                    } finally {

                        setIsAuthLoading(
                            false
                        );
                    }
                };


            restoreSession();

        },
        []
    );


    const startSession =
        async (
            user: AppUser
        ) => {

            await saveSession(
                user.id
            );

            setCurrentUser(
                user
            );
        };


    const logout =
        async () => {

            await removeSession();

            setCurrentUser(
                null
            );
        };


    const isAuthenticated =
        Boolean(
            currentUser
        );


    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isAuthenticated,
                isAuthLoading,
                startSession,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>
    );
};