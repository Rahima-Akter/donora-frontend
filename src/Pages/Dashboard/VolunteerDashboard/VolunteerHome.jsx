import useAuth from '../../../Hooks/useAuth';

const VolunteerHome = () => {
    const { user } = useAuth();
    return (
        <div className='p-5 bg-red-50 h-screen'>
            {
                user ? user && <p className='font-bold text-xl text-green-600'>🩸Welcome, <span className='text-Red uppercase'>{user?.displayName}</span></p> : <p className='font-bold text-xl'>Welcome....</p>
            }

        </div>
    );
};

export default VolunteerHome;