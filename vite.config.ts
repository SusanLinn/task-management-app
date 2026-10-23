import path from "path";

import {
    reactRouter,
} from "@react-router/dev/vite";

import tailwindcss
    from "@tailwindcss/vite";

import {
    defineConfig,
} from "vite";


const config =
    defineConfig({
        plugins: [
            reactRouter(),
            tailwindcss(),
        ],

        resolve: {
            alias: {
                "@":
                    path.resolve(
                        import.meta.dirname,
                        "./src"
                    ),
            },
        },
    });


export default config;