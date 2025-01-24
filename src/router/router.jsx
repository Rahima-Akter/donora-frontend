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
import ContentManagement from '../Pages/Dashboard/Shared/ContentManagement/ContentManagement';
import CreateBlog from '../Pages/Dashboard/components/CreateBlog';
import UpdateBlog from '../Pages/Dashboard/components/UpdateBlog';
import VolunteerHome from '../Pages/Dashboard/VolunteerDashboard/VolunteerHome';
import ViewBlogDetails from '../Shared/ViewBlog/ViewBlogDetails';
import Profile from '../Pages/Dashboard/Shared/Profile';
import DonationRequests from '../Pages/DonationRequests/DonationRequests';
import Blogs from '../Pages/blogPage/Blogs';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import AdminRoute from '../AdminRoute/AdminRoute';
import Search from '../Pages/SearchPage/Search';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/dashboard/view-blog/:id',
                element: <PrivateRoute>
                    <ViewBlogDetails />
                </PrivateRoute>,
                loader: async ({ params }) => {
                    const token = localStorage.getItem('access-token');
                    const response = await fetch(`http://localhost:5000/single-blog/${params.id}`, {
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
                element: <PrivateRoute>
                    <Details />
                </PrivateRoute>,
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
                path: 'donation-request',
                element: <DonationRequests />
            },
            {
                path: 'blogs',
                element: <Blogs />
            },
            {
                path: 'search',
                element: <Search />
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
        element: <PrivateRoute>
            <DashboardLayout />
        </PrivateRoute>,
        children: [
            {
                index: true,
                element: <DonorHome />
            },
            {
                path: '/dashboard/create-donation-request',
                element: <PrivateRoute>
                    <DonationReqForm />
                </PrivateRoute>
            },
            {
                path: '/dashboard/my-donation-requests',
                element: <PrivateRoute>
                    <MyDonationRequest />
                </PrivateRoute>
            },
            {
                path: '/dashboard/UpdateRequest/:id',
                element: <PrivateRoute>
                    <UpdateRequests />
                </PrivateRoute>,
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
                element: <PrivateRoute>
                    <AdminHome />
                </PrivateRoute>
            },
            {
                path: '/dashboard/all-users',
                element: <PrivateRoute>
                    <AdminRoute>
                    <AllUsers />
                    </AdminRoute>
                </PrivateRoute>
            },
            {
                path: '/dashboard/all-blood-donation-request',
                element: <PrivateRoute>
                    <AllDonationRequests />
                </PrivateRoute>
            },
            {
                path: '/dashboard/content-management',
                element: <PrivateRoute>
                    <ContentManagement />
                </PrivateRoute>
            },
            {
                path: '/dashboard/create-blog',
                element: <PrivateRoute>
                    <CreateBlog />
                </PrivateRoute>
            },
            {
                path: '/dashboard/update-blog/:id',
                element: <UpdateBlog />,
                loader: async ({ params }) => {
                    const token = localStorage.getItem('access-token');
                    const response = await fetch(`http://localhost:5000/single-blog/${params.id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });
                    const data = await response.json();
                    return data;
                }
            },
            // volunteer home
            {
                path: '/dashboard/volunteer-home',
                element: <VolunteerHome />
            },
            // common route
            {
                path: '/dashboard/profile',
                element: <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            }
        ]
    }
]);

export default router;