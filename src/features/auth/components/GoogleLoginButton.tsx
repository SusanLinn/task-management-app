import {
    GoogleLogin,
    type CredentialResponse,
} from "@react-oauth/google";

import {
    useMutation,
} from "@tanstack/react-query";

import {
    useNavigate,
} from "react-router";

import FormErrorMessage
    from "@/components/shared/FormErrorMessage";

import {
    useAuth,
} from "../hooks/useAuth";

import {
    authenticateWithGoogle,
} from "../services/authService";


const GoogleLoginButton = () => {

    const navigate =
        useNavigate();


    const {
        startSession,
    } =
        useAuth();


    const googleMutation =
        useMutation({
            mutationFn:
                authenticateWithGoogle,

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


    const handleGoogleSuccess =
        (
            response:
                CredentialResponse
        ) => {

            googleMutation.reset();


            if (!response.credential) {
                return;
            }


            googleMutation.mutate(
                response.credential
            );
        };


    const handleGoogleError =
        () => {

            googleMutation.reset();
        };


    return (
        <div
            className="
                space-y-3
            "
        >

            <div
                className="
                    flex
                    justify-center
                "
            >

                <GoogleLogin
                    onSuccess={
                        handleGoogleSuccess
                    }
                    onError={
                        handleGoogleError
                    }
                    text="signin_with"
                    size="medium"
                />

            </div>


            {
                googleMutation
                    .isPending && (

                    <p
                        className="
                            text-center
                            text-sm
                            text-muted-foreground
                        "
                    >
                        Signing in...
                    </p>

                )
            }


            <FormErrorMessage
                message={
                    googleMutation
                        .isError
                        ? "Google sign-in failed. Please try again."
                        : undefined
                }
            />

        </div>
    );
};


export default GoogleLoginButton;