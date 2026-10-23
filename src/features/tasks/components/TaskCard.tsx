import type {
    PointerEvent,
} from "react";

import {
    useTranslation,
} from "react-i18next";

import {
    useSortable,
} from "@dnd-kit/react/sortable";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import type {
    Task,
    TaskStatus,
} from "@/types/task";


interface TaskCardProps {
    task:
        Task;

    index:
        number;

    columnStatus:
        TaskStatus;

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


const TaskCard =
    ({
        task,
        index,
        columnStatus,
        onEdit,
        onDelete,
    }: TaskCardProps) => {

        const {
            t,
        } =
            useTranslation();


        const {
            ref,
            isDragging,
        } =
            useSortable({
                id:
                    task.id,

                index,

                group:
                    columnStatus,

                type:
                    "item",

                accept:
                    "item",
            });


        const stopDrag =
            (
                event:
                    PointerEvent
            ) => {

                event
                    .stopPropagation();
            };


        const getPriorityLabel =
            () => {

                switch (
                    task.priority
                ) {

                    case "LOW":
                        return t(
                            "task.low"
                        );

                    case "MEDIUM":
                        return t(
                            "task.medium"
                        );

                    case "HIGH":
                        return t(
                            "task.high"
                        );

                    default:
                        return task.priority;
                }
            };


        return (
            <div
                ref={
                    ref
                }
                className={`
                    cursor-grab
                    active:cursor-grabbing
                    ${
                        isDragging
                            ? "opacity-50"
                            : ""
                    }
                `}
            >

                <Card
                    className="
                        gap-0
                        overflow-hidden
                    "
                >

                    <CardContent
                        className="
                            p-6
                        "
                    >

                        <div
                            className="
                                flex
                                items-start
                                justify-between
                                gap-4
                            "
                        >

                            <div
                                className="
                                    min-w-0
                                    flex-1
                                "
                            >

                                <h3
                                    className="
                                        font-semibold
                                        leading-6
                                    "
                                >
                                    {
                                        task.title
                                    }
                                </h3>


                                {
                                    task.description && (
                                        <p
                                            className="
                                                mt-2
                                                text-sm
                                                text-muted-foreground
                                            "
                                        >
                                            {
                                                task.description
                                            }
                                        </p>
                                    )
                                }

                            </div>


                            <Badge
                                variant="secondary"
                            >
                                {
                                    getPriorityLabel()
                                }
                            </Badge>

                        </div>


                        {
                            task.dueDate && (
                                <p
                                    className="
                                        mt-4
                                        text-sm
                                        text-muted-foreground
                                    "
                                >
                                    {
                                        t(
                                            "task.due"
                                        )
                                    }
                                    :{" "}
                                    {
                                        task.dueDate
                                    }
                                </p>
                            )
                        }

                    </CardContent>


                    <CardFooter
                        className="
                            gap-2
                            border-t
                            bg-muted/20
                            px-6
                            py-4
                        "
                        onPointerDown={
                            stopDrag
                        }
                    >

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={
                                () =>
                                    onEdit(
                                        task
                                    )
                            }
                        >
                            {
                                t(
                                    "common.edit"
                                )
                            }
                        </Button>


                        <AlertDialog>

                            <AlertDialogTrigger
                                render={
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="
                                            text-destructive
                                            hover:text-destructive
                                        "
                                    />
                                }
                            >
                                {
                                    t(
                                        "common.delete"
                                    )
                                }
                            </AlertDialogTrigger>


                            <AlertDialogContent>

                                <AlertDialogHeader>

                                    <AlertDialogTitle>
                                        {
                                            t(
                                                "task.deleteTitle"
                                            )
                                        }
                                    </AlertDialogTitle>


                                    <AlertDialogDescription>
                                        {
                                            t(
                                                "task.deleteDescription"
                                            )
                                        }
                                    </AlertDialogDescription>

                                </AlertDialogHeader>


                                <AlertDialogFooter>

                                    <AlertDialogCancel>
                                        {
                                            t(
                                                "common.cancel"
                                            )
                                        }
                                    </AlertDialogCancel>


                                    <AlertDialogAction
                                        onClick={
                                            () =>
                                                onDelete(
                                                    task.id
                                                )
                                        }
                                    >
                                        {
                                            t(
                                                "common.delete"
                                            )
                                        }
                                    </AlertDialogAction>

                                </AlertDialogFooter>

                            </AlertDialogContent>

                        </AlertDialog>

                    </CardFooter>

                </Card>

            </div>
        );
    };


export default TaskCard;