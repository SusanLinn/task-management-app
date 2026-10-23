import {
    openDB,
    type DBSchema,
    type IDBPDatabase,
} from "idb";

import type {
    AppUser,
    AuthSession,
    LocalCredential,
} from "../../types/auth";

import type {
    Task,
} from "../../types/task";


interface TaskManagementDB
    extends DBSchema {

    users: {
        key: string;

        value:
            AppUser;

        indexes: {
            "by-provider-user":
                [
                    string,
                    string,
                ];

            "by-email":
                string;
        };
    };


    tasks: {
        key: string;

        value:
            Task;

        indexes: {
            "by-owner":
                string;

            "by-owner-status":
                [
                    string,
                    string,
                ];
        };
    };


    sessions: {
        key: string;

        value:
            AuthSession;

        indexes: {
            "by-user":
                string;
        };
    };


    localCredentials: {
        key: string;

        value:
            LocalCredential;
    };
}


const DATABASE_NAME =
    "task-management-db";

const DATABASE_VERSION =
    2;


let databasePromise:
    Promise<
        IDBPDatabase<
            TaskManagementDB
        >
    > | null =
    null;


export const getDatabase = () => {

    if (
        typeof indexedDB ===
        "undefined"
    ) {
        throw new Error(
            "IndexedDB is only available in the browser."
        );
    }


    if (!databasePromise) {

        databasePromise =
            openDB<TaskManagementDB>(
                DATABASE_NAME,
                DATABASE_VERSION,
                {
                    upgrade:
                        (
                            database,
                            oldVersion
                        ) => {

                            if (
                                oldVersion <
                                1
                            ) {

                                const userStore =
                                    database
                                        .createObjectStore(
                                            "users",
                                            {
                                                keyPath:
                                                    "id",
                                            }
                                        );


                                userStore
                                    .createIndex(
                                        "by-provider-user",
                                        [
                                            "provider",
                                            "providerUserId",
                                        ],
                                        {
                                            unique:
                                                true,
                                        }
                                    );


                                userStore
                                    .createIndex(
                                        "by-email",
                                        "email"
                                    );


                                const taskStore =
                                    database
                                        .createObjectStore(
                                            "tasks",
                                            {
                                                keyPath:
                                                    "id",
                                            }
                                        );


                                taskStore
                                    .createIndex(
                                        "by-owner",
                                        "ownerId"
                                    );


                                taskStore
                                    .createIndex(
                                        "by-owner-status",
                                        [
                                            "ownerId",
                                            "status",
                                        ]
                                    );


                                const sessionStore =
                                    database
                                        .createObjectStore(
                                            "sessions",
                                            {
                                                keyPath:
                                                    "id",
                                            }
                                        );


                                sessionStore
                                    .createIndex(
                                        "by-user",
                                        "userId"
                                    );
                            }


                            if (
                                oldVersion <
                                2
                            ) {

                                database
                                    .createObjectStore(
                                        "localCredentials",
                                        {
                                            keyPath:
                                                "userId",
                                        }
                                    );
                            }
                        },
                }
            );
    }


    return databasePromise;
};