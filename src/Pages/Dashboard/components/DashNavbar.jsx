import { Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import logo from '../../../assets/logo.PNG'
import { BiDonateBlood, BiLogOut } from 'react-icons/bi';
import { MdBloodtype } from 'react-icons/md';
import { TbHomeHeart } from 'react-icons/tb';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { LuImagePlay } from 'react-icons/lu';

const DashNavbar = () => {
    const { user, logOut } = useAuth();
    const isAdmin = true;
    const isDonor = false;
    return (
        <>
            <aside className="flex flex-col w-full h-screen px-4 pb-8 lg:pt-3 pt-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
                <div className='lg:block hidden'>
                    <Link to="/" className="mx-auto flex justify-start items-center">
                        <img className="w-[85px] h-14 mt-2" src={logo} alt="Logo" /><span className='-ml-5 text-2xl uppercase text-Red font-bold'>donora</span>
                    </Link>
                </div>
                {/* donor navigations */}
                {
                    isDonor && <div className="flex flex-col justify-between flex-1 mt-6">
                        <nav>
                            <Link to="/dashboard"
                                className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                                href="#"
                            >
                                <TbHomeHeart className='text-2xl text-Red' />
                                <span className="mx-4 font-medium">Home</span>
                            </Link>

                            <Link to="/dashboard/create-donation-request"
                                className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                                href="#"
                            >
                                <MdBloodtype className='text-2xl text-Red' />
                                <span className="mx-4 font-medium">Donation Request</span>
                            </Link>

                            <Link to="/dashboard/my-donation-requests"
                                className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                                href="#"
                            >
                                <BiDonateBlood className='text-2xl text-Red' />
                                <span className="ml-3 font-medium whitespace-nowrap">My Donation Request</span>
                            </Link>

                            <Link onClick={logOut} className="flex items-center px-4 py-2 mt-5 bg-Red hover:bg-Racing-Red text-white transition-colors duration-300 transform rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 "
                                href="#">
                                <BiLogOut className='text-2xl' />
                                <span className="mr-4 ml-1 -mt-1 font-medium">Log Out</span>
                            </Link>
                        </nav>
                    </div>
                }
                {/* admin navigations */}
                {
                    isAdmin && <div className="flex flex-col justify-between flex-1 mt-6">
                        <nav>
                            <Link to="/dashboard/admin"
                                className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                                href="#"
                            >
                                <TbHomeHeart className='text-2xl text-Red' />
                                <span className="mx-4 font-medium">Home</span>
                            </Link>

                            <Link to="/dashboard/all-users"
                                className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                                href="#"
                            >
                                <HiOutlineUserGroup className='text-2xl text-Red' />
                                <span className="mx-4 font-medium">All Users</span>
                            </Link>

                            <Link to="/dashboard/all-blood-donation-request"
                                className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                                href="#"
                            >
                                <MdBloodtype className='text-2xl text-Red' />
                                <span className="ml-3 font-medium whitespace-nowrap">All Donation Request</span>
                            </Link>
                            <Link to="/dashboard/content-management"
                                className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                                href="#"
                            >
                                <LuImagePlay className='text-2xl text-Red' />
                                <span className="ml-3 font-medium whitespace-nowrap">Content Management</span>
                            </Link>

                            <Link onClick={logOut} className="flex items-center px-4 py-2 mt-5 bg-Red hover:bg-Racing-Red text-white transition-colors duration-300 transform rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 "
                                href="#">
                                <BiLogOut className='text-2xl' />
                                <span className="mr-4 ml-1 -mt-1 font-medium">Log Out</span>
                            </Link>
                        </nav>
                    </div>
                }
            </aside>
        </>
    );
};

export default DashNavbar;