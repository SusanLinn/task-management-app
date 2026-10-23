import {
    Languages,
} from "lucide-react";

import {
    useTranslation,
} from "react-i18next";

import {
    Button,
} from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    AppLanguage,
    useSettingsStore,
} from "@/stores/settingsStore";


const LanguageSwitcher =
    () => {

        const {
            t,
        } =
            useTranslation();


        const language =
            useSettingsStore(
                (
                    state
                ) =>
                    state.language
            );


        const setLanguage =
            useSettingsStore(
                (
                    state
                ) =>
                    state.setLanguage
            );


        return (
            <DropdownMenu>

                <DropdownMenuTrigger
                    render={
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            aria-label="Change language"
                        />
                    }
                >
                    <Languages
                        className="size-4"
                    />
                </DropdownMenuTrigger>


                <DropdownMenuContent
                    align="end"
                >

                    <DropdownMenuItem
                        onClick={
                            () =>
                                setLanguage(
                                    AppLanguage.English
                                )
                        }
                    >

                        {
                            language ===
                            AppLanguage.English
                                ? "✓ "
                                : ""
                        }

                        {
                            t(
                                "language.english"
                            )
                        }

                    </DropdownMenuItem>


                    <DropdownMenuItem
                        onClick={
                            () =>
                                setLanguage(
                                    AppLanguage.Myanmar
                                )
                        }
                    >

                        {
                            language ===
                            AppLanguage.Myanmar
                                ? "✓ "
                                : ""
                        }

                        {
                            t(
                                "language.myanmar"
                            )
                        }

                    </DropdownMenuItem>

                </DropdownMenuContent>

            </DropdownMenu>
        );
    };


export default LanguageSwitcher;