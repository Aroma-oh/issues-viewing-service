import App from 'App';
import Detail from 'pages/Detail';
import List from 'pages/List';
import NotFound from 'components/common/NotFound';
import {Navigate, createBrowserRouter} from 'react-router-dom';

import {PATH} from 'constants/apis';

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Navigate to={PATH} replace={true} />,
            },
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
