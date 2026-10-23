import {
    useState,
} from "react";

import {
    useNavigate,
} from "react-router";

import {
    useTranslation,
} from "react-i18next";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import {
    Button,
} from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Skeleton,
} from "@/components/ui/skeleton";

import LanguageSwitcher
    from "@/components/shared/LanguageSwitcher";

import PageError
    from "@/components/shared/PageError";

import ThemeToggle
    from "@/components/shared/ThemeToggle";

import {
    useAuth,
} from "@/features/auth/hooks/useAuth";

import KanbanBoard
    from "@/features/tasks/components/KanbanBoard";

import TaskForm
    from "@/features/tasks/components/TaskForm";

import {
    useTaskMutations,
} from "@/features/tasks/hooks/useTaskMutations";

import {
    useTasks,
} from "@/features/tasks/hooks/useTasks";

import type {
    TaskFormData,
} from "@/features/tasks/schemas/taskSchemas";

import type {
    Task,
} from "@/types/task";


const DashboardPage =
    () => {

        const navigate =
            useNavigate();


        const {
            t,
        } =
            useTranslation();


        const [
            isTaskDialogOpen,
            setIsTaskDialogOpen,
        ] =
            useState(
                false
            );


        const [
            editingTask,
            setEditingTask,
        ] =
            useState<
                Task | null
            >(
                null
            );


        const {
            currentUser,
            logout,
        } =
            useAuth();


        const ownerId =
            currentUser?.id ??
            "";


        const {
            data:
                tasks = [],

            isPending,

            isError,
        } =
            useTasks(
                ownerId
            );


        const {
            createTaskMutation,
            updateTaskMutation,
            deleteTaskMutation,
            reorderTasksMutation,
        } =
            useTaskMutations(
                ownerId
            );


        const handleLogout =
            async () => {

                await logout();


                navigate(
                    "/login",
                    {
                        replace:
                            true,
                    }
                );
            };


        const handleOpenCreate =
            () => {

                setEditingTask(
                    null
                );


                setIsTaskDialogOpen(
                    true
                );
            };


        const handleEditTask =
            (
                task:
                    Task
            ) => {

                setEditingTask(
                    task
                );


                setIsTaskDialogOpen(
                    true
                );
            };


        const handleDialogChange =
            (
                open:
                    boolean
            ) => {

                setIsTaskDialogOpen(
                    open
                );


                if (
                    !open
                ) {

                    setEditingTask(
                        null
                    );
                }
            };


        const handleCreateTask =
            (
                data:
                    TaskFormData
            ) => {

                createTaskMutation
                    .mutate(
                        data,
                        {
                            onSuccess:
                                () => {

                                    handleDialogChange(
                                        false
                                    );
                                },
                        }
                    );
            };


        const handleUpdateTask =
            (
                data:
                    TaskFormData
            ) => {

                if (
                    !editingTask
                ) {
                    return;
                }


                updateTaskMutation
                    .mutate(
                        {
                            task:
                                editingTask,

                            data,
                        },
                        {
                            onSuccess:
                                () => {

                                    handleDialogChange(
                                        false
                                    );
                                },
                        }
                    );
            };


        const handleDeleteTask =
            (
                taskId:
                    string
            ) => {

                deleteTaskMutation
                    .mutate(
                        taskId
                    );
            };


        const handleReorderTasks =
            (
                updatedTasks:
                    Task[]
            ) => {

                reorderTasksMutation
                    .mutate(
                        updatedTasks
                    );
            };


        if (
            !currentUser
        ) {
            return null;
        }


        if (
            isPending
        ) {

            return (
                <main
                    className="
                        min-h-screen
                        bg-background
                        p-6
                    "
                >

                    <div
                        className="
                            mx-auto
                            max-w-7xl
                            space-y-8
                        "
                    >

                        <Skeleton
                            className="
                                h-20
                                w-full
                            "
                        />


                        <div
                            className="
                                grid
                                gap-6
                                xl:grid-cols-3
                            "
                        >

                            <Skeleton
                                className="
                                    h-[520px]
                                "
                            />

                            <Skeleton
                                className="
                                    h-[520px]
                                "
                            />

                            <Skeleton
                                className="
                                    h-[520px]
                                "
                            />

                        </div>

                    </div>

                </main>
            );
        }


        if (
            isError
        ) {

            return (
                <PageError
                    message={
                        t(
                            "dashboard.loadError"
                        )
                    }
                />
            );
        }


        const initials =
            currentUser
                .name
                .split(
                    " "
                )
                .map(
                    (
                        word
                    ) =>
                        word[0]
                )
                .join(
                    ""
                )
                .slice(
                    0,
                    2
                )
                .toUpperCase();


        return (
            <main
                className="
                    min-h-screen
                    bg-muted/20
                    text-foreground
                "
            >

                <header
                    className="
                        border-b
                        bg-background
                    "
                >

                    <div
                        className="
                            mx-auto
                            flex
                            max-w-7xl
                            items-center
                            justify-between
                            gap-4
                            px-6
                            py-4
                        "
                    >

                        <div>

                            <h1
                                className="
                                    text-xl
                                    font-bold
                                    tracking-tight
                                "
                            >
                                {
                                    t(
                                        "common.appName"
                                    )
                                }
                            </h1>


                            <p
                                className="
                                    text-sm
                                    text-muted-foreground
                                "
                            >
                                {
                                    t(
                                        "common.taskManagement"
                                    )
                                }
                            </p>

                        </div>


                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                sm:gap-3
                            "
                        >

                            <Avatar>

                                <AvatarImage
                                    src={
                                        currentUser
                                            .avatar
                                    }
                                    alt={
                                        currentUser
                                            .name
                                    }
                                />


                                <AvatarFallback>
                                    {
                                        initials
                                    }
                                </AvatarFallback>

                            </Avatar>


                            <div
                                className="
                                    hidden
                                    md:block
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        font-medium
                                    "
                                >
                                    {
                                        currentUser
                                            .name
                                    }
                                </p>


                                <p
                                    className="
                                        text-xs
                                        text-muted-foreground
                                    "
                                >
                                    {
                                        currentUser
                                            .email
                                    }
                                </p>

                            </div>


                            <LanguageSwitcher />


                            <ThemeToggle />


                            <Button
                                type="button"
                                variant="outline"
                                onClick={
                                    handleLogout
                                }
                            >
                                {
                                    t(
                                        "common.logout"
                                    )
                                }
                            </Button>

                        </div>

                    </div>

                </header>


                <section
                    className="
                        mx-auto
                        max-w-7xl
                        px-6
                        py-8
                    "
                >

                    <div
                        className="
                            mb-8
                            flex
                            flex-col
                            gap-4
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >

                        <div>

                            <h2
                                className="
                                    text-3xl
                                    font-bold
                                    tracking-tight
                                "
                            >
                                {
                                    t(
                                        "dashboard.myTasks"
                                    )
                                }
                            </h2>


                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-muted-foreground
                                "
                            >
                                {
                                    t(
                                        "dashboard.description"
                                    )
                                }
                            </p>

                        </div>


                        <Button
                            type="button"
                            onClick={
                                handleOpenCreate
                            }
                        >
                            +{" "}
                            {
                                t(
                                    "dashboard.addTask"
                                )
                            }
                        </Button>

                    </div>


                    <KanbanBoard
                        tasks={
                            tasks
                        }
                        onEdit={
                            handleEditTask
                        }
                        onDelete={
                            handleDeleteTask
                        }
                        onReorder={
                            handleReorderTasks
                        }
                    />

                </section>


                <Dialog
                    open={
                        isTaskDialogOpen
                    }
                    onOpenChange={
                        handleDialogChange
                    }
                >

                    <DialogContent
                        className="
                            sm:max-w-xl
                        "
                    >

                        <DialogHeader>

                            <DialogTitle>
                                {
                                    editingTask
                                        ? t(
                                            "task.editTask"
                                        )
                                        : t(
                                            "task.createTask"
                                        )
                                }
                            </DialogTitle>


                            <DialogDescription>
                                {
                                    editingTask
                                        ? t(
                                            "task.editDescription"
                                        )
                                        : t(
                                            "task.createDescription"
                                        )
                                }
                            </DialogDescription>

                        </DialogHeader>


                        <TaskForm
                            task={
                                editingTask ??
                                undefined
                            }
                            isPending={
                                editingTask
                                    ? updateTaskMutation
                                        .isPending
                                    : createTaskMutation
                                        .isPending
                            }
                            onSubmit={
                                editingTask
                                    ? handleUpdateTask
                                    : handleCreateTask
                            }
                            onCancel={
                                () =>
                                    handleDialogChange(
                                        false
                                    )
                            }
                        />

                    </DialogContent>

                </Dialog>

            </main>
        );
    };


export default DashboardPage;