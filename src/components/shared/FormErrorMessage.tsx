interface FormErrorMessageProps {
    message?:
        string;
}


const FormErrorMessage = ({
    message,
}: FormErrorMessageProps) => {

    if (!message) {
        return null;
    }


    return (
        <p
            className="
                mt-1
                text-sm
                text-destructive
            "
        >
            {message}
        </p>
    );
};


export default FormErrorMessage;