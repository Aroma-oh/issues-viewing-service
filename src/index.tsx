import ReactDOM from 'react-dom/client';
import {Router} from './Router';
import {RouterProvider} from 'react-router-dom';
import 'styles/reset.css';
import 'styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={Router} />);
