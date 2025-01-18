import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import Home from '../Pages/Home/Home';
import Login from '../Components/Logi-Registration/Login';
import Register from '../Components/Logi-Registration/Register';
import DashboardLayout from '../Pages/Dashboard/DashboardLayout/DashboardLayout';
import DonationReqForm from '../Pages/Dashboard/DonationReqForm';
import MyDonationRequest from '../Pages/Dashboard/DashboardLayout/MyDonationRequest';
import DonorHome from '../Pages/Dashboard/DonorHome';
import UpdateRequests from '../Pages/Dashboard/components/UpdateRequests';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    // ***donor dashboard***
    {
        path: '/dashboard',
        element: <DashboardLayout/>,
        children: [
            {
                path: '/dashboard',
                element: <DonorHome/>
            },
            {
                path: '/dashboard/create-donation-request',
                element: <DonationReqForm/>
            },
            {
                path: '/dashboard/my-donation-requests',
                element: <MyDonationRequest/>
            },
            {
                path: '/dashboard/UpdateRequest/:id',
                element: <UpdateRequests/>
            },
        ]
    }
]);

export default router;