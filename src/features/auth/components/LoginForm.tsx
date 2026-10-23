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
    loginSchema,
    type LoginData,
} from "../schemas/authSchemas";

import {
    authenticateWithDummyJson,
} from "../services/authService";

import {
    getLoginErrorMessage,
} from "../utils/getLoginErrorMessage";

import {
    useAuth,
} from "../hooks/useAuth";


const LoginForm = () => {

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
        useForm<LoginData>({
            resolver:
                zodResolver(
                    loginSchema
                ),

            defaultValues: {
                username: "",
                password: "",
            },
        });


    const loginMutation =
        useMutation({
            mutationFn:
                authenticateWithDummyJson,

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
                LoginData
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
            ? getLoginErrorMessage(
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
                    htmlFor="dummy-username"
                >
                    Username
                </Label>

                <Input
                    id="dummy-username"
                    autoComplete="username"
                    placeholder="DummyJSON username"
                    {...register(
                        "username",
                        {
                            onChange:
                                clearApiError,
                        }
                    )}
                />

                <FormErrorMessage
                    message={
                        errors
                            .username
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
                    htmlFor="dummy-password"
                >
                    Password
                </Label>

                <Input
                    id="dummy-password"
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
                        : "Sign In with DummyJSON"
                }
            </Button>

        </form>
    );
};


export default LoginForm;