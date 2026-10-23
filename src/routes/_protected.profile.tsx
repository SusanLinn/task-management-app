import {
    Link,
} from "react-router";


const ProfilePage = () => {

    return (
        <section>

            <h1>
                Profile
            </h1>

            <p>
                Current user information
                will be here.
            </p>

            <Link to="/dashboard">
                Back to Dashboard
            </Link>

        </section>
    );
};


export default ProfilePage;