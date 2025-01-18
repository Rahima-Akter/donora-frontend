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
                element: <UpdateRequests/>,
                loader: ({params}) => fetch(`http://localhost:5000/blood-request/${params.id}`)
            },
            {
                path: '/dashboard/details/:id',
                element: <Details/>,
                loader: ({params}) => fetch(`http://localhost:5000/blood-request/${params.id}`)
            },
        ]
    }
]);

export default router;