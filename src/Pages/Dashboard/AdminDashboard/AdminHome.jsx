import useAuth from '../../../Hooks/useAuth';
import Stats from '../Shared/Stats/Stats';
import { Helmet } from 'react-helmet-async';

const AdminHome = () => {
    const { user } = useAuth();

    return (
        <div className='lg:p-5 p-8 dark:bg-gray-900 bg-red-50 h-full min-h-screen'>
            <Helmet>
                <title>Dashboard || Home</title>
            </Helmet>
            {
                user ? user && <p className='font-bold text-xl text-green-600'>🩸Welcome, <span className='text-Red uppercase'>{user?.displayName}</span></p> : <p className='font-bold text-xl'>Welcome....</p>
            }
            <Stats />
        </div>
    );
};

export default AdminHome;