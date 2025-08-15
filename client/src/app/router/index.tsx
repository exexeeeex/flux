import { createBrowserRouter } from 'react-router';
import { Layout } from '../layout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
    },
]);
