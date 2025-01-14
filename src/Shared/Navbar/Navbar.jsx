
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
            <div className="relative md:px-10 px-8 mx-auto flex items-center justify-between">
                <Link to="/" className="lg:text-3xl text-Red text-xl font-bold uppercase">
                    <span className="flex justify-center items-center">
                        <img src={logo} alt="logo" className="md:w-20 w-14 md:-mr-5 -mr-3 mt-2" />
                        Donora
                    </span>
                </Link>

                <div className="hidden lg:flex items-center space-x-8 text-white text-sm">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 hover:text-Red uppercase font-semibold ${isActive ? "text-white bg-Red hover:text-Crimson-Red px-3 py-2 rounded-md ring-1 ring-white" : ""
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="donation-request"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 hover:text-Red uppercase font-semibold ${isActive ? "text-white bg-Red hover:text-Crimson-Red px-3 py-2 rounded-md ring-1 ring-white" : ""
                            }`
                        }
                    >
                        Donation Request
                    </NavLink>
                    <NavLink
                        to="blogs"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 hover:text-Red uppercase font-semibold ${isActive ? "text-white bg-Red hover:text-Crimson-Red px-3 py-2 rounded-md ring-1 ring-white" : ""
                            }`
                        }
                    >
                        Blog
                    </NavLink>
                    <NavLink
                        to="funds"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 hover:text-Red uppercase font-semibold ${isActive ? "text-white bg-Red hover:text-Crimson-Red px-3 py-2 rounded-md ring-1 ring-white" : ""
                            }`
                        }
                    >
                        Funds
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
                                <div className="absolute -right-20 top-12 bg-white rounded-md shadow-lg z-10 w-44">
                                    <p className="px-4 py-2 border-b text-center text-pink-500">
                                        {user.displayName || "User"}
                                    </p>
                                    <button
                                        className="block w-full px-4 py-2 bg-Red hover:bg-pink-700 text-white rounded-b-md"
                                        onClick={logOut}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <button onClick={() => navigate('/login')} className="bg-Red px-3 mr-5 py-2 text-white font-semibold rounded">Login</button>
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
                                <div className="absolute md:-right-5 -right-20 top-12 bg-white rounded-md shadow-lg z-10 w-44">
                                    <p className="px-4 py-2 border-b text-center text-pink-500">
                                        {user.displayName || "User"}
                                    </p>
                                    <button
                                        className="block w-full px-4 py-2 bg-Red hover:bg-pink-700 text-white rounded-b-md"
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
                        {isMobileMenuOpen ? <FaTimes className="md:text-2xl text-xl" /> : <FaBars className="md:text-2xl text-xl" />}
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