import type {
    Config,
} from "@react-router/dev/config";


const config = {
    appDirectory: "src", //→ React Router files ကို src/ ထဲမှာရှာ
    ssr: false, //→ SPA Mode
} satisfies Config;


export default config;