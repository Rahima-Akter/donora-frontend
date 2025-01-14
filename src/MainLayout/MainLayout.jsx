import { Outlet } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Navbar from '../Shared/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div className='h-[100vh] flex flex-col'>
            <Navbar/>
            <div className='flex-grow'> 
                <Outlet/>
            </div>
        </div>
    );
};

export default MainLayout;