import {
    useEffect,
} from "react";

import i18n
    from "@/i18n/i18n";

import {
    useSettingsStore,
} from "@/stores/settingsStore";

import {
    ThemeMode,
} from "@/types/theme";


const AppSettingsController =
    () => {

        const theme =
            useSettingsStore(
                (
                    state
                ) =>
                    state.theme
            );


        const themeOverride =
            useSettingsStore(
                (
                    state
                ) =>
                    state.themeOverride
            );


        const language =
            useSettingsStore(
                (
                    state
                ) =>
                    state.language
            );


        useEffect(
            () => {

                const activeTheme =
                    themeOverride ??
                    theme;


                const root =
                    document
                        .documentElement;


                const mediaQuery =
                    window
                        .matchMedia(
                            "(prefers-color-scheme: dark)"
                        );


                const applyTheme =
                    () => {

                        root
                            .classList
                            .remove(
                                ThemeMode.Light,
                                ThemeMode.Dark
                            );


                        if (
                            activeTheme ===
                            ThemeMode.System
                        ) {

                            root
                                .classList
                                .add(
                                    mediaQuery.matches
                                        ? ThemeMode.Dark
                                        : ThemeMode.Light
                                );

                            return;
                        }


                        root
                            .classList
                            .add(
                                activeTheme
                            );
                    };


                applyTheme();


                if (
                    activeTheme !==
                    ThemeMode.System
                ) {
                    return;
                }


                mediaQuery
                    .addEventListener(
                        "change",
                        applyTheme
                    );


                return () => {

                    mediaQuery
                        .removeEventListener(
                            "change",
                            applyTheme
                        );
                };

            },
            [
                theme,
                themeOverride,
            ]
        );


        useEffect(
            () => {

                void i18n
                    .changeLanguage(
                        language
                    );


                document
                    .documentElement
                    .setAttribute(
                        "lang",
                        language
                    );

            },
            [
                language,
            ]
        );


        return null;
    };


export default AppSettingsController;