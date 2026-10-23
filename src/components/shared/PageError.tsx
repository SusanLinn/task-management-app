import {
    Button,
} from "@/components/ui/button";


interface PageErrorProps {
    message:
        string;

    onRetry?:
        () => void;
}


const PageError = ({
    message,
    onRetry,
}: PageErrorProps) => {

    return (
        <div
            className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-background
                px-6
            "
        >

            <div
                className="
                    space-y-4
                    text-center
                "
            >

                <p
                    className="
                        text-sm
                        text-destructive
                    "
                >
                    {message}
                </p>


                {
                    onRetry && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={
                                onRetry
                            }
                        >
                            Try Again
                        </Button>
                    )
                }

            </div>

        </div>
    );
};


export default PageError;