import {
    create,
} from "zustand";

import {
    createJSONStorage,
    persist,
} from "zustand/middleware";

import {
    ThemeMode,
} from "@/types/theme";


export enum AppLanguage {
    English = "en",
    Myanmar = "my",
}


interface SettingsState {
    theme:
        ThemeMode;

    themeOverride:
        ThemeMode | null;

    language:
        AppLanguage;

    setTheme:
        (
            theme:
                ThemeMode
        ) => void;

    setThemeOverride:
        (
            theme:
                ThemeMode | null
        ) => void;

    setLanguage:
        (
            language:
                AppLanguage
        ) => void;
}


export const useSettingsStore =
    create<SettingsState>()(
        persist(
            (
                set
            ) => ({
                theme:
                    ThemeMode.System,

                themeOverride:
                    null,

                language:
                    AppLanguage.English,


                setTheme:
                    (
                        theme
                    ) => {

                        set({
                            theme,
                        });
                    },


                setThemeOverride:
                    (
                        themeOverride
                    ) => {

                        set({
                            themeOverride,
                        });
                    },


                setLanguage:
                    (
                        language
                    ) => {

                        set({
                            language,
                        });
                    },
            }),

            {
                name:
                    "taskflow-settings",

                storage:
                    createJSONStorage(
                        () =>
                            localStorage
                    ),

                partialize:
                    (
                        state
                    ) => ({
                        theme:
                            state.theme,

                        language:
                            state.language,
                    }),
            }
        )
    );