import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

// Page
import Login from './pages/login';
import Dashboard from './pages/dashboard';

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element:
            <AuthMiddleware>
                <Layout />
            </AuthMiddleware>
        ,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/user",
                element: <User />
            },
        ]
    },

]);

// File
import './index.css'
import 'react-toastify/dist/ReactToastify.css';

// Service
import { Provider } from 'react-redux'
import { store } from './redux/store';
import Layout from './components/layouts/layout';
import User from './pages/user/user';
import AuthMiddleware from './middleware/AuthMiddleware';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
    </Provider>
)
