import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    DragDropProvider,
} from "@dnd-kit/react";

import {
    move,
} from "@dnd-kit/helpers";

import type {
    Task,
    TaskStatus,
} from "@/types/task";

import KanbanColumn
    from "./KanbanColumn";


interface KanbanBoardProps {
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

    onReorder:
        (
            tasks:
                Task[]
        ) => void;
}


type TaskColumns =
    Record<
        TaskStatus,
        Task[]
    >;


const createTaskColumns =
    (
        tasks:
            Task[]
    ): TaskColumns => {

        return {
            TODO:
                tasks.filter(
                    (
                        task
                    ) =>
                        task.status ===
                        "TODO"
                ),

            IN_PROGRESS:
                tasks.filter(
                    (
                        task
                    ) =>
                        task.status ===
                        "IN_PROGRESS"
                ),

            DONE:
                tasks.filter(
                    (
                        task
                    ) =>
                        task.status ===
                        "DONE"
                ),
        };
    };


const cloneTaskColumns =
    (
        columns:
            TaskColumns
    ): TaskColumns => {

        return {
            TODO:
                columns.TODO.map(
                    (
                        task
                    ) => ({
                        ...task,
                    })
                ),

            IN_PROGRESS:
                columns
                    .IN_PROGRESS
                    .map(
                        (
                            task
                        ) => ({
                            ...task,
                        })
                    ),

            DONE:
                columns.DONE.map(
                    (
                        task
                    ) => ({
                        ...task,
                    })
                ),
        };
    };


const KanbanBoard = ({
    tasks,
    onEdit,
    onDelete,
    onReorder,
}: KanbanBoardProps) => {

    const [
        columns,
        setColumns,
    ] =
        useState<TaskColumns>(
            () =>
                createTaskColumns(
                    tasks
                )
        );


    const columnsRef =
        useRef<TaskColumns>(
            columns
        );


    const previousColumnsRef =
        useRef<TaskColumns>(
            columns
        );


    useEffect(
        () => {

            const nextColumns =
                createTaskColumns(
                    tasks
                );

            setColumns(
                nextColumns
            );

            columnsRef.current =
                nextColumns;

        },
        [
            tasks,
        ]
    );


    const handleDragStart =
        () => {

            previousColumnsRef
                .current =
                cloneTaskColumns(
                    columnsRef.current
                );
        };


    const handleDragOver =
        (
            event:
                Parameters<
                    NonNullable<
                        React.ComponentProps<
                            typeof DragDropProvider
                        >["onDragOver"]
                    >
                >[0]
        ) => {

            setColumns(
                (
                    currentColumns
                ) => {

                    const nextColumns =
                        move(
                            currentColumns,
                            event
                        ) as TaskColumns;


                    columnsRef.current =
                        nextColumns;


                    return nextColumns;
                }
            );
        };


    const handleDragEnd =
        (
            event:
                Parameters<
                    NonNullable<
                        React.ComponentProps<
                            typeof DragDropProvider
                        >["onDragEnd"]
                    >
                >[0]
        ) => {

            if (
                event.canceled
            ) {

                const previousColumns =
                    previousColumnsRef
                        .current;

                setColumns(
                    previousColumns
                );

                columnsRef.current =
                    previousColumns;

                return;
            }


            const now =
                new Date()
                    .toISOString();


            const statuses:
                TaskStatus[] = [
                    "TODO",
                    "IN_PROGRESS",
                    "DONE",
                ];


            const updatedTasks =
                statuses.flatMap(
                    (
                        status
                    ) => {

                        return columnsRef
                            .current[
                                status
                            ]
                            .map(
                                (
                                    task,
                                    index
                                ) => ({
                                    ...task,

                                    status,

                                    position:
                                        index,

                                    updatedAt:
                                        now,
                                })
                            );
                    }
                );


            const nextColumns =
                createTaskColumns(
                    updatedTasks
                );


            setColumns(
                nextColumns
            );

            columnsRef.current =
                nextColumns;


            onReorder(
                updatedTasks
            );
        };


    return (
        <DragDropProvider
            onDragStart={
                handleDragStart
            }
            onDragOver={
                handleDragOver
            }
            onDragEnd={
                handleDragEnd
            }
        >

            <div
                className="
                    grid
                    grid-cols-1
                    gap-6
                    xl:grid-cols-3
                "
            >

                <KanbanColumn
                    title="To Do"
                    status="TODO"
                    tasks={
                        columns.TODO
                    }
                    onEdit={
                        onEdit
                    }
                    onDelete={
                        onDelete
                    }
                />


                <KanbanColumn
                    title="In Progress"
                    status="IN_PROGRESS"
                    tasks={
                        columns
                            .IN_PROGRESS
                    }
                    onEdit={
                        onEdit
                    }
                    onDelete={
                        onDelete
                    }
                />


                <KanbanColumn
                    title="Done"
                    status="DONE"
                    tasks={
                        columns.DONE
                    }
                    onEdit={
                        onEdit
                    }
                    onDelete={
                        onDelete
                    }
                />

            </div>

        </DragDropProvider>
    );
};


export default KanbanBoard;