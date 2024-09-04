import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Landing from "../pages/Landing";
import Contact from "../pages/Contact";
import Project from "../pages/Project";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Landing />
            },
            {
                path: 'project/:id',
                element: <Project />
            },
            {
                path: 'contact',
                element: <Contact />
            }
        ]
    }
]);

export default router;