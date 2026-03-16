import { createBrowserRouter } from 'react-router'
import Landing from './features/landing/pages/Landing'
import Register from './features/auth/pages/Register'
import Login from './features/auth/pages/Login'
import Protected from './features/auth/components/Protected'
import Dashboard from './features/home/pages/Dashboard'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />
    },
    {
        path: '/home',
        element: <Protected>
            <Dashboard /></Protected>
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    }
])
