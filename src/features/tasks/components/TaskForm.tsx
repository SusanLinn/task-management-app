import {
    useEffect,
} from "react";

import {
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    useTranslation,
} from "react-i18next";

import {
    Button,
} from "@/components/ui/button";

import {
    Input,
} from "@/components/ui/input";

import {
    Label,
} from "@/components/ui/label";

import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";

import {
    Textarea,
} from "@/components/ui/textarea";

import {
    taskFormSchema,
    type TaskFormData,
} from "@/features/tasks/schemas/taskSchemas";

import type {
    Task,
} from "@/types/task";


interface TaskFormProps {

    task?:
        Task;

    isPending:
        boolean;

    onSubmit:
        (
            data:
                TaskFormData
        ) => void;

    onCancel:
        () => void;
}


const TaskForm =
    ({
        task,
        isPending,
        onSubmit,
        onCancel,
    }: TaskFormProps) => {

        const {
            t,
        } =
            useTranslation();


        const {
            register,
            handleSubmit,
            reset,
            formState: {
                errors,
            },
        } =
            useForm<TaskFormData>({

                resolver:
                    zodResolver(
                        taskFormSchema
                    ),

                defaultValues: {

                    title:
                        task?.title ??
                        "",

                    description:
                        task?.description ??
                        "",

                    status:
                        task?.status ??
                        "TODO",

                    priority:
                        task?.priority ??
                        "MEDIUM",

                    dueDate:
                        task?.dueDate ??
                        "",
                },
            });


        useEffect(
            () => {

                reset({

                    title:
                        task?.title ??
                        "",

                    description:
                        task?.description ??
                        "",

                    status:
                        task?.status ??
                        "TODO",

                    priority:
                        task?.priority ??
                        "MEDIUM",

                    dueDate:
                        task?.dueDate ??
                        "",
                });

            },
            [
                task,
                reset,
            ]
        );


        const submitForm =
            (
                data:
                    TaskFormData
            ) => {

                onSubmit(
                    data
                );
            };


        return (
            <form
                onSubmit={
                    handleSubmit(
                        submitForm
                    )
                }
                className="
                    space-y-6
                "
            >

                {/* Title */}

                <div
                    className="
                        space-y-2
                    "
                >

                    <Label
                        htmlFor="title"
                    >
                        {
                            t(
                                "task.title"
                            )
                        }
                    </Label>


                    <Input
                        id="title"
                        type="text"
                        {...register(
                            "title"
                        )}
                    />


                    {
                        errors.title && (
                            <p
                                className="
                                    text-sm
                                    text-destructive
                                "
                            >
                                {
                                    errors
                                        .title
                                        .message
                                }
                            </p>
                        )
                    }

                </div>


                {/* Description */}

                <div
                    className="
                        space-y-2
                    "
                >

                    <Label
                        htmlFor="description"
                    >
                        {
                            t(
                                "task.description"
                            )
                        }
                    </Label>


                    <Textarea
                        id="description"
                        placeholder={
                            t(
                                "task.descriptionPlaceholder"
                            )
                        }
                        className="
                            min-h-24
                        "
                        {...register(
                            "description"
                        )}
                    />


                    {
                        errors.description && (
                            <p
                                className="
                                    text-sm
                                    text-destructive
                                "
                            >
                                {
                                    errors
                                        .description
                                        .message
                                }
                            </p>
                        )
                    }

                </div>


                {/* Status + Priority */}

                <div
                    className="
                        grid
                        gap-4
                        sm:grid-cols-2
                    "
                >

                    {/* Status */}

                    <div
                        className="
                            space-y-2
                        "
                    >

                        <Label
                            htmlFor="status"
                        >
                            {
                                t(
                                    "task.status"
                                )
                            }
                        </Label>


                        <NativeSelect
                            id="status"
                            {...register(
                                "status"
                            )}
                        >

                            <NativeSelectOption
                                value="TODO"
                            >
                                {
                                    t(
                                        "task.todo"
                                    )
                                }
                            </NativeSelectOption>


                            <NativeSelectOption
                                value="IN_PROGRESS"
                            >
                                {
                                    t(
                                        "task.inProgress"
                                    )
                                }
                            </NativeSelectOption>


                            <NativeSelectOption
                                value="DONE"
                            >
                                {
                                    t(
                                        "task.done"
                                    )
                                }
                            </NativeSelectOption>

                        </NativeSelect>


                        {
                            errors.status && (
                                <p
                                    className="
                                        text-sm
                                        text-destructive
                                    "
                                >
                                    {
                                        errors
                                            .status
                                            .message
                                    }
                                </p>
                            )
                        }

                    </div>


                    {/* Priority */}

                    <div
                        className="
                            space-y-2
                        "
                    >

                        <Label
                            htmlFor="priority"
                        >
                            {
                                t(
                                    "task.priority"
                                )
                            }
                        </Label>


                        <NativeSelect
                            id="priority"
                            {...register(
                                "priority"
                            )}
                        >

                            <NativeSelectOption
                                value="LOW"
                            >
                                {
                                    t(
                                        "task.low"
                                    )
                                }
                            </NativeSelectOption>


                            <NativeSelectOption
                                value="MEDIUM"
                            >
                                {
                                    t(
                                        "task.medium"
                                    )
                                }
                            </NativeSelectOption>


                            <NativeSelectOption
                                value="HIGH"
                            >
                                {
                                    t(
                                        "task.high"
                                    )
                                }
                            </NativeSelectOption>

                        </NativeSelect>


                        {
                            errors.priority && (
                                <p
                                    className="
                                        text-sm
                                        text-destructive
                                    "
                                >
                                    {
                                        errors
                                            .priority
                                            .message
                                    }
                                </p>
                            )
                        }

                    </div>

                </div>


                {/* Due Date */}

                <div
                    className="
                        space-y-2
                    "
                >

                    <Label
                        htmlFor="dueDate"
                    >
                        {
                            t(
                                "task.dueDate"
                            )
                        }
                    </Label>


                    <Input
                        id="dueDate"
                        type="date"
                        {...register(
                            "dueDate"
                        )}
                    />


                    {
                        errors.dueDate && (
                            <p
                                className="
                                    text-sm
                                    text-destructive
                                "
                            >
                                {
                                    errors
                                        .dueDate
                                        .message
                                }
                            </p>
                        )
                    }

                </div>


                {/* Actions */}

                <div
                    className="
                        flex
                        justify-end
                        gap-3
                        pt-2
                    "
                >

                    <Button
                        type="button"
                        variant="outline"
                        disabled={
                            isPending
                        }
                        onClick={
                            onCancel
                        }
                    >
                        {
                            t(
                                "common.cancel"
                            )
                        }
                    </Button>


                    <Button
                        type="submit"
                        disabled={
                            isPending
                        }
                    >
                        {
                            task
                                ? t(
                                    "task.updateTask"
                                )
                                : t(
                                    "task.createTask"
                                )
                        }
                    </Button>

                </div>

            </form>
        );
    };


export default TaskForm;