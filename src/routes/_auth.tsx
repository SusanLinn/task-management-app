import {
    useEffect,
} from "react";

import {
    Navigate,
    Outlet,
} from "react-router";

import PageLoader
    from "@/components/shared/PageLoader";

import {
    useAuth,
} from "@/features/auth/hooks/useAuth";

import {
    useSettingsStore,
} from "@/stores/settingsStore";

import {
    ThemeMode,
} from "@/types/theme";


const AuthLayout = () => {

    const {
        isAuthenticated,
        isAuthLoading,
    } =
        useAuth();


    const setThemeOverride =
        useSettingsStore(
            (
                state
            ) =>
                state.setThemeOverride
        );


    useEffect(
        () => {

            setThemeOverride(
                ThemeMode.System
            );


            return () => {

                setThemeOverride(
                    null
                );
            };

        },
        [
            setThemeOverride,
        ]
    );


    if (
        isAuthLoading
    ) {

        return (
            <PageLoader
                message="Checking session..."
            />
        );
    }


    if (
        isAuthenticated
    ) {

        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }


    return (
        <main
            className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-muted/30
                px-6
                py-12
            "
        >

            <Outlet />

        </main>
    );
};


export default AuthLayout;