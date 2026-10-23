export type AuthProvider =
    | "dummyjson"
    | "local"
    | "google";


export interface AppUser {
    id: string;

    provider:
        AuthProvider;

    providerUserId:
        string;

    name: string;

    email: string;

    avatar?: string;

    initialTasksImported?:
        boolean;

    createdAt: string;

    updatedAt: string;
}


export interface AuthSession {
    id: string;

    userId: string;

    createdAt: string;
}


export interface LocalCredential {
    userId: string;

    passwordHash:
        string;

    passwordSalt:
        string;

    iterations:
        number;

    createdAt:
        string;

    updatedAt:
        string;
}