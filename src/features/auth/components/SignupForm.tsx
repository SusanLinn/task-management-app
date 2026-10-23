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
    signupSchema,
    type SignupData,
} from "../schemas/authSchemas";

import {
    registerWithLocalAccount,
} from "../services/authService";

import {
    getLocalAuthErrorMessage,
} from "../utils/getLocalAuthErrorMessage";


const SignupForm = () => {

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
        useForm<SignupData>({
            resolver:
                zodResolver(
                    signupSchema
                ),

            defaultValues: {
                name: "",
                email: "",
                password: "",
                confirmPassword:
                    "",
            },
        });


    const signupMutation =
        useMutation({
            mutationFn:
                registerWithLocalAccount,

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


    const onSubmit =
        (
            data:
                SignupData
        ) => {

            signupMutation.reset();

            signupMutation.mutate(
                data
            );
        };


    const signupError =
        signupMutation.error
            ? getLocalAuthErrorMessage(
                signupMutation.error
            )
            : undefined;


    return (
        <form
            onSubmit={
                handleSubmit(
                    onSubmit
                )
            }
            className="
                space-y-5
            "
        >

            <div
                className="space-y-2"
            >

                <Label
                    htmlFor="name"
                >
                    Name
                </Label>

                <Input
                    id="name"
                    placeholder="Your name"
                    autoComplete="name"
                    {...register(
                        "name"
                    )}
                />

                <FormErrorMessage
                    message={
                        errors
                            .name
                            ?.message
                    }
                />

            </div>


            <div
                className="space-y-2"
            >

                <Label
                    htmlFor="email"
                >
                    Email
                </Label>

                <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...register(
                        "email"
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
                className="space-y-2"
            >

                <Label
                    htmlFor="password"
                >
                    Password
                </Label>

                <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    {...register(
                        "password"
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


            <div
                className="space-y-2"
            >

                <Label
                    htmlFor="confirmPassword"
                >
                    Confirm Password
                </Label>

                <Input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    {...register(
                        "confirmPassword"
                    )}
                />

                <FormErrorMessage
                    message={
                        errors
                            .confirmPassword
                            ?.message
                    }
                />

            </div>


            <FormErrorMessage
                message={
                    signupError
                }
            />


            <Button
                type="submit"
                className="w-full"
                disabled={
                    signupMutation
                        .isPending
                }
            >
                {
                    signupMutation
                        .isPending
                        ? "Creating account..."
                        : "Create Account"
                }
            </Button>

        </form>
    );
};


export default SignupForm;