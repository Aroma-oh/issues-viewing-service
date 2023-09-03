import App from 'App';
import Detail from 'pages/Detail';
import List from 'pages/List';
import NotFound from 'pages/NotFound';
import {createBrowserRouter} from 'react-router-dom';

import {PATH} from 'constants/apis';

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: PATH,
                element: <List />,
            },
            {
                path: `${PATH}/:id`,
                element: <Detail />,
            },
        ],
        errorElement: <NotFound />,
    },
]);
