import { Outlet } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='h-[100vh] flex flex-col'>
            <Navbar/>
            <div className='flex-grow'> 
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;