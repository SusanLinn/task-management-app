import type {
    RouteConfig,
} from "@react-router/dev/routes";

import {
    flatRoutes,
} from "@react-router/fs-routes";


const routes =
    flatRoutes() satisfies RouteConfig;


export default routes;