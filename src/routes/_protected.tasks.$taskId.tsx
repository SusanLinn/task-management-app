import {
    useParams,
} from "react-router";


const TaskDetailPage = () => {

    const {
        taskId,
    } = useParams();


    return (
        <section>

            <h1>
                Task Detail
            </h1>

            <p>
                Task ID: {taskId}
            </p>

        </section>
    );
};


export default TaskDetailPage;