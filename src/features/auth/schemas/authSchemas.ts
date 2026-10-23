import {
    z,
} from "zod";


export const loginSchema =
    z.object({
        username:
            z
                .string()
                .trim()
                .min(
                    1,
                    "Username is required."
                ),

        password:
            z
                .string()
                .min(
                    1,
                    "Password is required."
                ),
    });


export const localLoginSchema =
    z.object({
        email:
            z
                .string()
                .trim()
                .email(
                    "Please enter a valid email."
                ),

        password:
            z
                .string()
                .min(
                    1,
                    "Password is required."
                ),
    });


export const signupSchema =
    z
        .object({
            name:
                z
                    .string()
                    .trim()
                    .min(
                        2,
                        "Name must contain at least 2 characters."
                    ),

            email:
                z
                    .string()
                    .trim()
                    .email(
                        "Please enter a valid email."
                    ),

            password:
                z
                    .string()
                    .min(
                        8,
                        "Password must contain at least 8 characters."
                    ),

            confirmPassword:
                z
                    .string()
                    .min(
                        1,
                        "Please confirm your password."
                    ),
        })
        .refine(
            (
                data
            ) =>
                data.password ===
                data.confirmPassword,
            {
                message:
                    "Passwords do not match.",

                path: [
                    "confirmPassword",
                ],
            }
        );


export const dummyJsonLoginResponseSchema =
    z.object({
        id:
            z.number(),

        username:
            z.string(),

        email:
            z.string(),

        firstName:
            z.string(),

        lastName:
            z.string(),

        image:
            z.string(),

        accessToken:
            z.string(),

        refreshToken:
            z.string(),
    });


export type LoginData =
    z.infer<
        typeof loginSchema
    >;


export type LocalLoginData =
    z.infer<
        typeof localLoginSchema
    >;


export type SignupData =
    z.infer<
        typeof signupSchema
    >;


export type DummyJsonLoginResponse =
    z.infer<
        typeof dummyJsonLoginResponseSchema
    >;