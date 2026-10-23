export const getLocalAuthErrorMessage =
    (
        error:
            unknown
    ) => {

        if (
            !(error instanceof Error)
        ) {
            return "Something went wrong.";
        }


        if (
            error.message ===
            "LOCAL_USER_EXISTS"
        ) {
            return "An account with this email already exists.";
        }


        if (
            error.message ===
            "LOCAL_USER_NOT_FOUND" ||
            error.message ===
            "INVALID_LOCAL_PASSWORD"
        ) {
            return "Invalid email or password.";
        }


        if (
            error.message ===
            "LOCAL_CREDENTIAL_NOT_FOUND"
        ) {
            return "Unable to access this account.";
        }


        if (
            error.message ===
            "PASSWORD_CRYPTO_UNAVAILABLE"
        ) {
            return "Secure password processing is unavailable in this browser.";
        }


        return "Something went wrong. Please try again.";
    };