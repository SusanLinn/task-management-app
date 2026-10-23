import {
    Navigate,
    Outlet,
} from "react-router";

import PageLoader
    from "@/components/shared/PageLoader";

import {
    useAuth,
} from "@/features/auth/hooks/useAuth";


const ProtectedLayout = () => {

    const {
        isAuthenticated,
        isAuthLoading,
    } =
        useAuth();


    if (isAuthLoading) {

        return (
            <PageLoader
                message="Checking session..."
            />
        );
    }


    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    return (
        <Outlet />
    );
};


export default ProtectedLayout;