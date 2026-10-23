import {
    Link,
} from "react-router";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import SignupForm
    from "@/features/auth/components/SignupForm";


const SignupPage = () => {

    return (
        <section
            className="
                mx-auto
                w-full
                max-w-md
            "
        >

            <Card>

                <CardHeader>

                    <CardTitle
                        className="
                            text-2xl
                        "
                    >
                        Create Account
                    </CardTitle>

                    <CardDescription>
                        Create your TaskFlow
                        local account.
                    </CardDescription>

                </CardHeader>


                <CardContent>

                    <SignupForm />

                </CardContent>

            </Card>


            <p
                className="
                    mt-6
                    text-center
                    text-sm
                    text-muted-foreground
                "
            >
                Already have an account?{" "}

                <Link
                    to="/login"
                    className="
                        font-medium
                        text-foreground
                        underline
                        underline-offset-4
                    "
                >
                    Sign In
                </Link>
            </p>

        </section>
    );
};


export default SignupPage;