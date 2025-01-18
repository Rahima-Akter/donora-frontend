import React from 'react';
import DashNavbar from '../DashNavbar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className='lg:flex lg:flex-row h-[100vh]'>
            <div className='lg:w-[20%] w-64'>
                <DashNavbar />
            </div>
            <div className='w-[80%]'>
                <Outlet/>
            </div>
        </div>
    );
};

export default DashboardLayout;