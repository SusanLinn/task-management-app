import axios from "axios";

import {
    z,
} from "zod";


export const getLoginErrorMessage =
    (
        error:
            unknown
    ) => {

        if (
            error instanceof
            z.ZodError
        ) {
            return "Invalid server response.";
        }


        if (
            axios.isAxiosError(
                error
            )
        ) {

            if (!error.response) {

                return "Unable to connect to the server.";
            }


            if (
                error.response.status === 400 ||
                error.response.status === 401
            ) {
                return "Invalid username or password.";
            }
        }


        return "Something went wrong. Please try again.";
    };