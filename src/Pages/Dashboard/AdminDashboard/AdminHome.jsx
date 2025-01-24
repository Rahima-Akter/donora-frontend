import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const AdminHome = () => {
    const { user } = useAuth();

    return (
        <div className='lg:p-5 p-8 bg-red-50 min-h-screen'>
            {
                user ? user && <p className='font-bold text-xl text-green-600'>🩸Welcome, <span className='text-Red uppercase'>{user?.displayName}</span></p> : <p className='font-bold text-xl'>Welcome....</p>
            }

        </div>
    );
};

export default AdminHome;