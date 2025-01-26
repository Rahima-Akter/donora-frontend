import { NavLink } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import logo from '../../../assets/logo.PNG'
import { BiDonateBlood, BiLogOut } from 'react-icons/bi';
import { MdBloodtype } from 'react-icons/md';
import { TbHomeHeart } from 'react-icons/tb';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { LuImagePlay } from 'react-icons/lu';
import useGetRole from '../../../Hooks/useGetRole';
import { CgProfile } from 'react-icons/cg';

const DashNavbar = () => {
    const { logOut } = useAuth();
    const [userRole, isLoading] = useGetRole();
    return (
        <>
            <aside className="flex flex-col w-full h-screen px-4 pb-8 lg:pt-3 pt-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 z-50">
                <div className='lg:block hidden'>
                    <NavLink to="/" className="mx-auto flex justify-start items-center">
                        <img className="w-[85px] h-14 mt-2" src={logo} alt="Logo" /><span className='-ml-5 text-2xl uppercase text-Red font-bold'>donora</span>
                    </NavLink>
                </div>
                {/* donor navigations */}
                {
                    userRole === 'donor' && <div className="flex flex-col justify-between flex-1 mt-6">
                        <nav>
                            <NavLink
                                to="/dashboard"
                                end // This ensures that the active class only applies to the /dashboard route
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${isActive
                                        ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                                        : "text-gray-600 dark:text-gray-400"
                                    }`
                                }
                            >
                                <TbHomeHeart className="text-2xl text-Red" />
                                <span className="mx-4 font-medium">Home</span>
                            </NavLink>

                            <NavLink to="/dashboard/create-donation-request"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700         ${isActive ? "bg-gray-100 text-gray-700 dark:bg-gray-800" : ""}`
                                }
                            >
                                <MdBloodtype className='text-2xl text-Red' />
                                <span className="mx-4 font-medium">Donation Request</span>
                            </NavLink>

                            <NavLink to="/dashboard/my-donation-requests"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700         ${isActive ? "bg-gray-100 text-gray-700 dark:bg-gray-800" : ""}`
                                }
                            >
                                <BiDonateBlood className='text-2xl text-Red' />
                                <span className="ml-3 font-medium whitespace-nowrap">My Donation Request</span>
                            </NavLink>
                        </nav>
                    </div>
                }
                {/* admin navigations */}
                {
                    userRole === 'admin' && <div className="flex flex-col justify-between flex-1 mt-6">
                        <nav>
                            <NavLink to="/dashboard/admin"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700         ${isActive ? "bg-gray-100 text-gray-700 dark:bg-gray-800" : ""}`
                                }
                            >
                                <TbHomeHeart className='text-2xl text-Red' />
                                <span className="mx-4 font-medium">Home</span>
                            </NavLink>

                            <NavLink
                                to="/dashboard/all-users"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700         ${isActive ? "bg-gray-100 text-gray-700 dark:bg-gray-800" : ""}`
                                }
                            >
                                <HiOutlineUserGroup className="text-2xl text-Red" />
                                <span className="mx-4 font-medium">All Users</span>
                            </NavLink>

                            <NavLink to="/dashboard/all-blood-donation-request"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700         ${isActive ? "bg-gray-100 text-gray-700 dark:bg-gray-800" : ""}`
                                }
                            >
                                <MdBloodtype className='text-2xl text-Red' />
                                <span className="ml-3 font-medium whitespace-nowrap">All Donation Request</span>
                            </NavLink>
                            <NavLink to="/dashboard/content-management"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700         ${isActive ? "bg-gray-100 text-gray-700 dark:bg-gray-800" : ""}`
                                }
                            >
                                <LuImagePlay className='text-2xl text-Red' />
                                <span className="ml-3 font-medium whitespace-nowrap">Content Management</span>
                            </NavLink>
                        </nav>
                    </div>
                }
                {/* volunteer navigations */}
                {
                    userRole === 'volunteer' && <div className="flex flex-col justify-between flex-1 mt-6">
                        <nav>
                            <NavLink to="/dashboard/volunteer"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${isActive ? "bg-gray-100 text-gray-700 dark:bg-gray-800" : ""}`
                                }
                            >
                                <TbHomeHeart className='text-2xl text-Red' />
                                <span className="mx-4 font-medium">Home</span>
                            </NavLink>

                            <NavLink to="/dashboard/all-blood-donation-request"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700         ${isActive ? "bg-gray-100 text-gray-700 dark:bg-gray-800" : ""}`
                                }
                            >
                                <MdBloodtype className='text-2xl text-Red' />
                                <span className="ml-3 font-medium whitespace-nowrap">All Donation Request</span>
                            </NavLink>
                            <NavLink to="/dashboard/content-management"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700         ${isActive ? "bg-gray-100 text-gray-700 dark:bg-gray-800" : ""}`
                                }
                            >
                                <LuImagePlay className='text-2xl text-Red' />
                                <span className="ml-3 font-medium whitespace-nowrap">Content Management</span>
                            </NavLink>
                        </nav>
                    </div>
                }

                <NavLink to="/dashboard/profile"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700         ${isActive ? "bg-gray-100 text-gray-700 dark:bg-gray-800" : ""}`
                    }
                >
                    <CgProfile className='text-2xl text-Red' />
                    <span className="mx-4 font-medium">Profile</span>
                </NavLink>


                <NavLink onClick={logOut}
                    className="bg-Red text-white hover:bg-Racing-Red flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform rounded-lg">
                    <BiLogOut className='text-2xl' />
                    <span className="mr-4 ml-3 -mt-1 font-medium">Log Out</span>
                </NavLink>
            </aside>
        </>
    );
};

export default DashNavbar;