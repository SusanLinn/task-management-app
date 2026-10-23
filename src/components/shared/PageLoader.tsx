import {
    Skeleton,
} from "@/components/ui/skeleton";


interface PageLoaderProps {
    message?:
        string;
}


const PageLoader = ({
    message =
        "Loading...",
}: PageLoaderProps) => {

    return (
        <div
            className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-background
            "
        >

            <div
                className="
                    flex
                    flex-col
                    items-center
                    gap-3
                "
            >

                <Skeleton
                    className="
                        h-8
                        w-8
                        rounded-full
                    "
                />

                <p
                    className="
                        text-sm
                        text-muted-foreground
                    "
                >
                    {message}
                </p>

            </div>

        </div>
    );
};


export default PageLoader;