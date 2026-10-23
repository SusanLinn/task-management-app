import {
    GoogleOAuthProvider,
} from "@react-oauth/google";

import type {
    ReactNode,
} from "react";


interface GoogleAuthProviderProps {
    children:
        ReactNode;
}


const GoogleAuthProvider = ({
    children,
}: GoogleAuthProviderProps) => {

    const clientId =
        import.meta.env
            .VITE_GOOGLE_CLIENT_ID;


    if (!clientId) {

        throw new Error(
            "VITE_GOOGLE_CLIENT_ID is missing."
        );
    }


    return (
        <GoogleOAuthProvider
            clientId={
                clientId
            }
        >
            {children}
        </GoogleOAuthProvider>
    );
};


export default GoogleAuthProvider;