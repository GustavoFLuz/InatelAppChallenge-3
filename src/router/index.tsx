import { Container } from "../shared/components";
import { Home } from "../pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        element: <Container />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
]);
