import i18n
    from "i18next";

import {
    initReactI18next,
} from "react-i18next";


const resources = {

    en: {

        translation: {

            common: {

                appName:
                    "TaskFlow",

                taskManagement:
                    "Task Management",

                logout:
                    "Logout",

                edit:
                    "Edit",

                delete:
                    "Delete",

                cancel:
                    "Cancel",

                save:
                    "Save",

                loading:
                    "Loading...",

                tryAgain:
                    "Try Again",
            },


            language: {

                english:
                    "English",

                myanmar:
                    "Myanmar",
            },


            dashboard: {

                myTasks:
                    "My Tasks",

                description:
                    "Organize and track your work across the board.",

                addTask:
                    "Add Task",

                loadError:
                    "Unable to load tasks.",
            },


            task: {

                title:
                    "Title",

                description:
                    "Description",

                descriptionPlaceholder:
                    "Enter task description",

                status:
                    "Status",

                priority:
                    "Priority",

                dueDate:
                    "Due Date",

                todo:
                    "To Do",

                inProgress:
                    "In Progress",

                done:
                    "Done",

                low:
                    "Low",

                medium:
                    "Medium",

                high:
                    "High",

                createTask:
                    "Create Task",

                updateTask:
                    "Update Task",

                editTask:
                    "Edit Task",

                createDescription:
                    "Add a new task to your board.",

                editDescription:
                    "Update the information for this task.",

                dropTasksHere:
                    "Drop tasks here",

                due:
                    "Due",

                deleteTitle:
                    "Delete task?",

                deleteDescription:
                    "This action cannot be undone. The task will be permanently removed.",
            },
        },
    },


    my: {

        translation: {

            common: {

                appName:
                    "TaskFlow",

                taskManagement:
                    "လုပ်ငန်းစီမံခန့်ခွဲမှု",

                logout:
                    "ထွက်မည်",

                edit:
                    "ပြင်ဆင်မည်",

                delete:
                    "ဖျက်မည်",

                cancel:
                    "ပယ်ဖျက်မည်",

                save:
                    "သိမ်းမည်",

                loading:
                    "ဖွင့်နေပါသည်...",

                tryAgain:
                    "ထပ်မံကြိုးစားမည်",
            },


            language: {

                english:
                    "အင်္ဂလိပ်",

                myanmar:
                    "မြန်မာ",
            },


            dashboard: {

                myTasks:
                    "ကျွန်ုပ်၏ လုပ်ငန်းများ",

                description:
                    "သင့်လုပ်ငန်းများကို စီစဉ်ပြီး အခြေအနေအလိုက် ခြေရာခံပါ။",

                addTask:
                    "လုပ်ငန်းအသစ်ထည့်မည်",

                loadError:
                    "လုပ်ငန်းများကို ဖွင့်၍မရပါ။",
            },


            task: {

                title:
                    "ခေါင်းစဉ်",

                description:
                    "ဖော်ပြချက်",

                descriptionPlaceholder:
                    "လုပ်ငန်းအကြောင်း ဖော်ပြချက်ရေးပါ",

                status:
                    "အခြေအနေ",

                priority:
                    "ဦးစားပေးအဆင့်",

                dueDate:
                    "ပြီးစီးရမည့်ရက်",

                todo:
                    "လုပ်ရန်",

                inProgress:
                    "လုပ်ဆောင်နေသည်",

                done:
                    "ပြီးဆုံးသည်",

                low:
                    "နိမ့်",

                medium:
                    "အလယ်အလတ်",

                high:
                    "မြင့်",

                createTask:
                    "လုပ်ငန်းအသစ်ဖန်တီးမည်",

                updateTask:
                    "လုပ်ငန်းကို ပြင်ဆင်မည်",

                editTask:
                    "လုပ်ငန်းပြင်ဆင်ခြင်း",

                createDescription:
                    "သင့်ဘုတ်တွင် လုပ်ငန်းအသစ်တစ်ခု ထည့်ပါ။",

                editDescription:
                    "ဤလုပ်ငန်း၏ အချက်အလက်များကို ပြင်ဆင်ပါ။",

                dropTasksHere:
                    "လုပ်ငန်းများကို ဤနေရာတွင် ချပါ",

                due:
                    "ပြီးစီးရမည့်ရက်",

                deleteTitle:
                    "ဤလုပ်ငန်းကို ဖျက်မည်လား?",

                deleteDescription:
                    "ဖျက်ပြီးပါက ဤလုပ်ငန်းကို ပြန်လည်ရယူ၍ မရနိုင်ပါ။",
            },
        },
    },
};


void i18n
    .use(
        initReactI18next
    )
    .init({

        resources,

        lng:
            "en",

        fallbackLng:
            "en",

        interpolation: {

            escapeValue:
                false,
        },
    });


export default i18n;