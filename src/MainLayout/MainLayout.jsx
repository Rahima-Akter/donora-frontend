import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import ThemeToggleButton from '../contexts/ThemeProvider/ThemeToggleButton';

const MainLayout = () => {
    return (
        <div className='h-full min-h-full flex flex-col dark:bg-gray-900 w-full min-w-full'>
            <Navbar/>
            <div className='flex-grow'> 
                <Outlet/>
            </div>
            <Footer/>
            <ThemeToggleButton/>
        </div>
    );
};

export default MainLayout;