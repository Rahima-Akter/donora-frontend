import useAuth from '../../../Hooks/useAuth';
import Stats from '../Shared/Stats/Stats';

const VolunteerHome = () => {
    const { user } = useAuth();
    return (
        <div className='p-5 bg-red-50 dark:bg-gray-900 h-full min-h-screen'>
            {
                user ? user && <p className='font-bold text-xl text-green-600'>🩸Welcome, <span className='text-Red uppercase'>{user?.displayName}</span></p> : <p className='font-bold text-xl'>Welcome....</p>
            }
            <Stats />
        </div>
    );
};

export default VolunteerHome;