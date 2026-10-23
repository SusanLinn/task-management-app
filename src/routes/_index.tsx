import {
    Navigate,
} from "react-router";

import PageLoader
    from "@/components/shared/PageLoader";

import {
    useAuth,
} from "@/features/auth/hooks/useAuth";


const IndexPage = () => {

    const {
        isAuthenticated,
        isAuthLoading,
    } =
        useAuth();


    if (isAuthLoading) {

        return (
            <PageLoader />
        );
    }


    return (
        <Navigate
            to={
                isAuthenticated
                    ? "/dashboard"
                    : "/login"
            }
            replace
        />
    );
};


export default IndexPage;