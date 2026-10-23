import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import type {
    ReactNode,
} from "react";

import AppSettingsController
    from "@/components/shared/AppSettingsController";

import {
    AuthProvider,
} from "@/features/auth/context/AuthContext";

import GoogleAuthProvider
    from "@/providers/GoogleAuthProvider";

import QueryProvider
    from "@/providers/QueryProvider";

import "./index.css";


interface LayoutProps {
    children:
        ReactNode;
}


export const Layout =
    ({
        children,
    }: LayoutProps) => {

        return (
            <html
                lang="en"
                suppressHydrationWarning
            >

                <head>

                    <meta
                        charSet="utf-8"
                    />

                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />

                    <Meta />

                    <Links />

                </head>


                <body>

                    {children}

                    <ScrollRestoration />

                    <Scripts />

                </body>

            </html>
        );
    };


const App =
    () => {

        return (
            <GoogleAuthProvider>

                <QueryProvider>

                    <AppSettingsController />

                    <AuthProvider>

                        <Outlet />

                    </AuthProvider>

                </QueryProvider>

            </GoogleAuthProvider>
        );
    };


export default App;