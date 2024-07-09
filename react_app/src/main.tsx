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
        path: "/dashboard",
        element: <Dashboard />,
    },

]);

// File
import './index.css'
import 'react-toastify/dist/ReactToastify.css';

// Service
import { ToastProvider } from './contexts/toastContext';
import { Provider } from 'react-redux'
import { store } from './redux/store';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ToastProvider>
            <RouterProvider router={router} />
            <ToastContainer />
        </ToastProvider>
    </Provider>
)
