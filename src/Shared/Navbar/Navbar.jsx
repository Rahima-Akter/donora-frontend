
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/Context";
import { useContext, useState } from "react";
// import ThemeSwitcher from "./ThemeSwitcher";
import logo from "../../assets/logo.PNG"

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className=" shadow-lg py-2 px-0 fixed bg-white/20 top-0 left-0 right-0 z-20 backdrop-blur-lg">
            <div className="relative md:px-10 px-2 mx-auto flex items-center justify-between">
                <Link to="/" className="lg:text-3xl text-Red text-xl font-bold uppercase">
                    <span className="flex justify-center items-center">
                        <img src={logo} alt="logo" className="md:w-20 w-14 md:-mr-5 -mr-3 mt-2" />
                        Donora
                    </span>
                </Link>

                <div className="hidden lg:flex items-center space-x-8 dark:text-white text-Red text-sm">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 uppercase font-semibold ${isActive ? "text-white bg-Red px-3 py-2 rounded-md ring-1 ring-white hover:bg-red-600" : ""
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="donation-request"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 uppercase font-semibold ${isActive ? "text-white bg-Red px-3 py-2 rounded-md ring-1 ring-white hover:bg-red-600" : ""
                            }`
                        }
                    >
                        Donation Request
                    </NavLink>
                    <NavLink
                        to="blogs"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 uppercase font-semibold ${isActive ? "text-white bg-Red px-3 py-2 rounded-md ring-1 ring-white hover:bg-red-600" : ""
                            }`
                        }
                    >
                        Blog
                    </NavLink>
                    <NavLink
                        to="funds"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 uppercase font-semibold ${isActive ? "text-white bg-Red px-3 py-2 rounded-md ring-1 ring-white hover:bg-red-600" : ""
                            }`
                        }
                    >
                        Funds
                    </NavLink>
                    <NavLink
                        to="search"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 uppercase font-semibold ${isActive ? "text-white bg-Red px-3 py-2 rounded-md ring-1 ring-white hover:bg-red-600" : ""
                            }`
                        }
                    >
                        search
                    </NavLink>

                </div>

                <div className="hidden lg:flex items-center gap-4">
                    {user ? (
                        <div className="relative">
                            <img
                                src={user?.photoURL || "https://via.placeholder.com/40"}
                                alt="User"
                                className="w-10 h-10 rounded-full ring-2 ring-pink-500 cursor-pointer"
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            />
                            {isUserMenuOpen && (
                                <div className="absolute -right-10 top-16 bg-white rounded-md shadow-lg z-10 w-44">
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="px-4 py-1 border-b border-Red/60 text-center text-Red">
                                            {user.displayName || "User"}
                                        </p>
                                        <NavLink to="/dashboard" className="text-Red my-2 hover:text-Racing-Red font-semibold uppercase">
                                            Dashborad
                                        </NavLink>
                                    </div>
                                    <button
                                        className="block w-full px-4 py-2 font-semibold bg-Red hover:bg-Crimson-Red text-white rounded-b-md"
                                        onClick={logOut}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <Link to="/login" className="bg-Red px-3 mr-5 py-2 text-white font-semibold rounded">
                                Login
                            </Link>
                        </div>)}
                    {/* <ThemeSwitcher /> */}
                </div>

                <div className="lg:hidden flex items-center gap-4 text-Red text-xl">
                    {user && (
                        <div className="relative">
                            <img
                                src={user?.photoURL || "https://via.placeholder.com/40"}
                                alt="User"
                                className="md:w-8 md:h-8 w-6 h-6 rounded-full ring-2 ring-pink-500 cursor-pointer"
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            />
                            {isUserMenuOpen && (
                                <div className="absolute md:-right-5 lg:-right-20 -right-12 top-10 md:top-12 bg-white rounded-md shadow-lg z-10 w-44">
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="px-4 py-2 border-b text-center font-semibold text-sm text-pink-500">
                                            {user.displayName || "User"}
                                        </p>
                                        <NavLink to="/dashboard" className="text-Red my-2 hover:text-Racing-Red font-semibold uppercase text-sm">
                                            Dashborad
                                        </NavLink>
                                    </div>
                                    <button
                                        className="block w-full px-4 py-2 bg-Red hover:bg-red-700 text-white rounded-b-md"
                                        onClick={logOut}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {/* <ThemeSwitcher /> */}
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <FaTimes className="md:text-2xl text-xl mr-3" /> : <FaBars className="md:text-2xl text-xl mr-3" />}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="lg:hidden flex flex-col items-center space-y-4 bg-Racing-Red p-4 absolute rounded-lg w-48 top-full mt-3 right-0 shadow-lg border border-gray-600 z-10">
                    <NavLink to="/" className="text-white hover:text-Red font-semibold uppercase">
                        Home
                    </NavLink>
                    <NavLink to="blogs" className="text-white hover:text-Red font-semibold uppercase">
                        blogs
                    </NavLink>
                    <NavLink to="funds" className="text-white hover:text-Red font-semibold uppercase">
                        funds
                    </NavLink>
                    <NavLink to="donation-request" className="text-white hover:text-Red font-semibold uppercase">
                        Donation request
                    </NavLink>
                    <button onClick={() => navigate('/login')} className="bg-Red px-3 py-2 text-white font-semibold hover:bg-pink-700 text-xs w-full">Login</button>
                    <button onClick={() => navigate('/register')} className="bg-Red px-3 py-2 text-white font-semibold hover:bg-pink-700 text-xs w-full">Register</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;