import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import Home from '../Pages/Home/Home';
import Login from '../Components/Logi-Registration/Login';
import Register from '../Components/Logi-Registration/Register';
import DonorHome from '../Pages/Dashboard/DonorDashboard/DonorHome';
import DonationReqForm from '../Pages/Dashboard/components/DonationReqForm';
import MyDonationRequest from '../Pages/Dashboard/DonorDashboard/MyDonationRequest';
import Details from '../Pages/Dashboard/components/Details';
import DashboardLayout from '../Pages/Dashboard/DashboardLayout/DashboardLayout';
import UpdateRequests from '../Pages/Dashboard/components/UpdateRequests';
import AdminHome from '../Pages/Dashboard/AdminDashboard/AdminHome';
import AllUsers from '../Pages/Dashboard/AdminDashboard/AllUsers';
import AllDonationRequests from '../Pages/Dashboard/AdminDashboard/AllDonationRequests';
import ContentManagement from '../Pages/Dashboard/AdminDashboard/contentManagement/ContentManagement';


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
        element: <DashboardLayout />,
        children: [
            {
                path: '/dashboard',
                element: <DonorHome />
            },
            {
                path: '/dashboard/create-donation-request',
                element: <DonationReqForm />
            },
            {
                path: '/dashboard/my-donation-requests',
                element: <MyDonationRequest />
            },
            {
                path: '/dashboard/UpdateRequest/:id',
                element: <UpdateRequests />,
                loader: async ({ params }) => {
                    const token = localStorage.getItem('access-token');
                    const response = await fetch(`http://localhost:5000/blood-request/${params.id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`, // adding the token
                        },
                    });
                    const data = await response.json();
                    return data;
                }
            },
            {
                path: '/dashboard/details/:id',
                element: <Details />,
                loader: async ({ params }) => {
                    const token = localStorage.getItem('access-token');
                    const response = await fetch(`http://localhost:5000/blood-request/${params.id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`, // adding the token
                        },
                    });
                    const data = await response.json();
                    return data;
                }
            },
            // admin dashboard ************************
            {
                path: '/dashboard/admin',
                element: <AdminHome />
            },
            {
                path: '/dashboard/all-users',
                element: <AllUsers />
            },
            {
                path: '/dashboard/all-blood-donation-request',
                element: <AllDonationRequests />
            },
            {
                path: '/dashboard/content-management',
                element: <ContentManagement />
            },
        ]
    }
]);

export default router;