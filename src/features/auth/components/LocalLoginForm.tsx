import {
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    useMutation,
} from "@tanstack/react-query";

import {
    useNavigate,
} from "react-router";

import {
    Button,
} from "@/components/ui/button";

import {
    Input,
} from "@/components/ui/input";

import {
    Label,
} from "@/components/ui/label";

import FormErrorMessage
    from "@/components/shared/FormErrorMessage";

import {
    useAuth,
} from "../hooks/useAuth";

import {
    localLoginSchema,
    type LocalLoginData,
} from "../schemas/authSchemas";

import {
    authenticateWithLocalAccount,
} from "../services/authService";

import {
    getLocalAuthErrorMessage,
} from "../utils/getLocalAuthErrorMessage";


const LocalLoginForm = () => {

    const navigate =
        useNavigate();


    const {
        startSession,
    } =
        useAuth();


    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } =
        useForm<LocalLoginData>({
            resolver:
                zodResolver(
                    localLoginSchema
                ),

            defaultValues: {
                email: "",
                password: "",
            },
        });


    const loginMutation =
        useMutation({
            mutationFn:
                authenticateWithLocalAccount,

            onSuccess:
                async (
                    user
                ) => {

                    await startSession(
                        user
                    );


                    navigate(
                        "/dashboard",
                        {
                            replace:
                                true,
                        }
                    );
                },
        });


    const clearApiError =
        () => {

            if (
                loginMutation
                    .isError
            ) {
                loginMutation
                    .reset();
            }
        };


    const onSubmit =
        (
            data:
                LocalLoginData
        ) => {

            loginMutation
                .reset();

            loginMutation
                .mutate(
                    data
                );
        };


    const onInvalid =
        () => {

            loginMutation
                .reset();
        };


    const loginError =
        loginMutation.error
            ? getLocalAuthErrorMessage(
                loginMutation.error
            )
            : undefined;


    return (
        <form
            onSubmit={
                handleSubmit(
                    onSubmit,
                    onInvalid
                )
            }
            className="
                space-y-5
            "
        >

            <div
                className="
                    space-y-2
                "
            >

                <Label
                    htmlFor="local-email"
                >
                    Email
                </Label>

                <Input
                    id="local-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    {...register(
                        "email",
                        {
                            onChange:
                                clearApiError,
                        }
                    )}
                />

                <FormErrorMessage
                    message={
                        errors
                            .email
                            ?.message
                    }
                />

            </div>


            <div
                className="
                    space-y-2
                "
            >

                <Label
                    htmlFor="local-password"
                >
                    Password
                </Label>

                <Input
                    id="local-password"
                    type="password"
                    autoComplete="current-password"
                    {...register(
                        "password",
                        {
                            onChange:
                                clearApiError,
                        }
                    )}
                />

                <FormErrorMessage
                    message={
                        errors
                            .password
                            ?.message
                    }
                />

            </div>


            <FormErrorMessage
                message={
                    loginError
                }
            />


            <Button
                type="submit"
                className="w-full"
                disabled={
                    loginMutation
                        .isPending
                }
            >
                {
                    loginMutation
                        .isPending
                        ? "Signing in..."
                        : "Sign In"
                }
            </Button>

        </form>
    );
};


export default LocalLoginForm;