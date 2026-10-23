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

import LocalLoginForm
    from "@/features/auth/components/LocalLoginForm";

import LoginForm
    from "@/features/auth/components/LoginForm";

import GoogleLoginButton
    from "@/features/auth/components/GoogleLoginButton";

const LoginPage = () => {

    return (
        <section
            className="
                mx-auto
                w-full
                max-w-5xl
            "
        >

            <div
                className="
                    mb-8
                    text-center
                "
            >

                <h1
                    className="
                        text-3xl
                        font-bold
                    "
                >
                    Welcome Back
                </h1>

                <p
                    className="
                        mt-2
                        text-muted-foreground
                    "
                >
                    Sign in to continue
                    to TaskFlow.
                </p>

            </div>

            <Card
                className="
                    mb-6
                "
            >

                <CardHeader
                    className="
                        text-center
                    "
                >

                    <CardTitle>
                        Continue with Google
                    </CardTitle>

                    <CardDescription>
                        Use your Google account
                        to access TaskFlow.
                    </CardDescription>

                </CardHeader>


                <CardContent>

                    <GoogleLoginButton />

                </CardContent>

</Card>

            <div
                className="
                    grid
                    gap-6
                    md:grid-cols-2
                "
            >

                <Card>

                    <CardHeader>

                        <CardTitle>
                            Local Account
                        </CardTitle>

                        <CardDescription>
                            Sign in with an account
                            created in TaskFlow.
                        </CardDescription>

                    </CardHeader>


                    <CardContent>

                        <LocalLoginForm />

                    </CardContent>

                </Card>


                <Card>

                    <CardHeader>

                        <CardTitle>
                            DummyJSON Account
                        </CardTitle>

                        <CardDescription>
                            Sign in with an existing
                            DummyJSON user.
                        </CardDescription>

                    </CardHeader>


                    <CardContent>

                        <LoginForm />

                    </CardContent>

                </Card>

            </div>


            <p
                className="
                    mt-8
                    text-center
                    text-sm
                    text-muted-foreground
                "
            >
                Don't have a local account?{" "}

                <Link
                    to="/signup"
                    className="
                        font-medium
                        text-foreground
                        underline
                        underline-offset-4
                    "
                >
                    Create an account
                </Link>
            </p>

        </section>
    );
};


export default LoginPage;