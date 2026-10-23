import {
    Monitor,
    Moon,
    Sun,
} from "lucide-react";

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
    useSettingsStore,
} from "@/stores/settingsStore";

import {
    ThemeMode,
} from "@/types/theme";


const ThemeToggle =
    () => {

        const theme =
            useSettingsStore(
                (
                    state
                ) =>
                    state.theme
            );


        const setTheme =
            useSettingsStore(
                (
                    state
                ) =>
                    state.setTheme
            );


        const ThemeIcon =
            theme ===
            ThemeMode.Light
                ? Sun
                : theme ===
                    ThemeMode.Dark
                    ? Moon
                    : Monitor;


        return (
            <DropdownMenu>

                <DropdownMenuTrigger
                    render={
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            aria-label="Change theme"
                        />
                    }
                >
                    <ThemeIcon
                        className="size-4"
                    />
                </DropdownMenuTrigger>


                <DropdownMenuContent
                    align="end"
                >

                    <DropdownMenuItem
                        onClick={
                            () =>
                                setTheme(
                                    ThemeMode.Light
                                )
                        }
                    >
                        <Sun
                            className="size-4"
                        />

                        Light

                        {
                            theme ===
                            ThemeMode.Light
                                ? " ✓"
                                : ""
                        }

                    </DropdownMenuItem>


                    <DropdownMenuItem
                        onClick={
                            () =>
                                setTheme(
                                    ThemeMode.Dark
                                )
                        }
                    >
                        <Moon
                            className="size-4"
                        />

                        Dark

                        {
                            theme ===
                            ThemeMode.Dark
                                ? " ✓"
                                : ""
                        }

                    </DropdownMenuItem>


                    <DropdownMenuItem
                        onClick={
                            () =>
                                setTheme(
                                    ThemeMode.System
                                )
                        }
                    >
                        <Monitor
                            className="size-4"
                        />

                        System

                        {
                            theme ===
                            ThemeMode.System
                                ? " ✓"
                                : ""
                        }

                    </DropdownMenuItem>

                </DropdownMenuContent>

            </DropdownMenu>
        );
    };


export default ThemeToggle;