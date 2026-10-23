import {
    z,
} from "zod";


export const taskFormSchema =
    z.object({
        title:
            z
                .string()
                .trim()
                .min(
                    1,
                    "Task title is required."
                ),

        description:
            z
                .string()
                .trim(),

        status:
            z.enum([
                "TODO",
                "IN_PROGRESS",
                "DONE",
            ]),

        priority:
            z.enum([
                "LOW",
                "MEDIUM",
                "HIGH",
            ]),

        dueDate:
            z.string(),
    });


export type TaskFormData =
    z.infer<
        typeof taskFormSchema
    >;