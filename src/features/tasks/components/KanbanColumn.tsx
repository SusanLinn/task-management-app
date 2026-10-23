import {
    useTranslation,
} from "react-i18next";

import {
    useDroppable,
} from "@dnd-kit/react";

import TaskCard
    from "@/features/tasks/components/TaskCard";

import type {
    Task,
    TaskStatus,
} from "@/types/task";


interface KanbanColumnProps {
    status:
        TaskStatus;

    tasks:
        Task[];

    onEdit:
        (
            task:
                Task
        ) => void;

    onDelete:
        (
            taskId:
                string
        ) => void;
}


const KanbanColumn =
    ({
        status,
        tasks,
        onEdit,
        onDelete,
    }: KanbanColumnProps) => {

        const {
            t,
        } =
            useTranslation();


        const {
            ref,
            isDropTarget,
        } =
            useDroppable({
                id:
                    status,

                type:
                    "column",

                accept:
                    "item",
            });


        const getColumnTitle =
            () => {

                switch (
                    status
                ) {

                    case "TODO":
                        return t(
                            "task.todo"
                        );

                    case "IN_PROGRESS":
                        return t(
                            "task.inProgress"
                        );

                    case "DONE":
                        return t(
                            "task.done"
                        );

                    default:
                        return status;
                }
            };


        return (
            <section
                className="
                    overflow-hidden
                    rounded-2xl
                    border
                    bg-background
                "
            >

                <header
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        px-6
                        py-5
                    "
                >

                    <h2
                        className="
                            text-lg
                            font-semibold
                        "
                    >
                        {
                            getColumnTitle()
                        }
                    </h2>


                    <span
                        className="
                            flex
                            size-7
                            items-center
                            justify-center
                            rounded-full
                            bg-muted
                            text-sm
                        "
                    >
                        {
                            tasks.length
                        }
                    </span>

                </header>


                <div
                    ref={
                        ref
                    }
                    className={`
                        min-h-[420px]
                        space-y-4
                        p-5

                        ${
                            isDropTarget
                                ? "bg-muted/40"
                                : ""
                        }
                    `}
                >

                    {
                        tasks.length ===
                        0
                            ? (
                                <div
                                    className="
                                        flex
                                        min-h-48
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-dashed
                                        text-sm
                                        text-muted-foreground
                                    "
                                >
                                    {
                                        t(
                                            "task.dropTasksHere"
                                        )
                                    }
                                </div>
                            )
                            : (
                                tasks.map(
                                    (
                                        task,
                                        index
                                    ) => (

                                        <TaskCard
                                            key={
                                                task.id
                                            }
                                            task={
                                                task
                                            }
                                            index={
                                                index
                                            }
                                            columnStatus={
                                                status
                                            }
                                            onEdit={
                                                onEdit
                                            }
                                            onDelete={
                                                onDelete
                                            }
                                        />

                                    )
                                )
                            )
                    }

                </div>

            </section>
        );
    };


export default KanbanColumn;