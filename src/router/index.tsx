import { Container } from "../shared/components";
import * as pages from "../pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        element: <Container />,
        children: [
            {
                path: "/",
                element: <pages.Home />,
            },
            {
                path: "/processes",
                element: <pages.Processes />,
            },

            {
                path: "/protocols",
                element: <pages.Protocols />,
            },

            {
                path: "/hosts",
                element: <pages.Hosts />,
            },

        ],
    },
]);
