import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/Context";
import { useContext, useState } from "react";
import logo from "../../assets/logo.PNG";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="shadow-lg md:py-3 xl:py-2 px-0 fixed bg-white/20 top-0 left-0 right-0 z-20 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
      <div className="relative md:px-10 px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center -ml-6 lg:-ml-0">
          <img src={logo} alt="Donora logo" className="w-20 mt-2" />
          <span className="lg:text-2xl text-xl font-bold text-Red uppercase -ml-3">
            Donora
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 uppercase font-medium text-sm rounded-md transition-colors ${
                isActive
                  ? "text-white bg-Red shadow-md"
                  : "text-gray-700 hover:bg-red-50 dark:text-gray-300 dark:hover:bg-gray-700"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/donation-request"
            className={({ isActive }) =>
              `px-3 py-2 uppercase font-medium text-sm rounded-md transition-colors ${
                isActive
                  ? "text-white bg-Red shadow-md"
                  : "text-gray-700 hover:bg-red-50 dark:text-gray-300 dark:hover:bg-gray-700"
              }`
            }
          >
            Donation Request
          </NavLink>

          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              `px-3 py-2 uppercase font-medium text-sm rounded-md transition-colors ${
                isActive
                  ? "text-white bg-Red shadow-md"
                  : "text-gray-700 hover:bg-red-50 dark:text-gray-300 dark:hover:bg-gray-700"
              }`
            }
          >
            Blog
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/funds"
                className={({ isActive }) =>
                  `px-3 py-2 uppercase font-medium text-sm rounded-md transition-colors ${
                    isActive
                      ? "text-white bg-Red shadow-md"
                      : "text-gray-700 hover:bg-red-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`
                }
              >
                Funds
              </NavLink>

              <NavLink
                to="/search"
                className={({ isActive }) =>
                  `px-3 py-2 uppercase font-medium text-sm rounded-md transition-colors ${
                    isActive
                      ? "text-white bg-Red shadow-md"
                      : "text-gray-700 hover:bg-red-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`
                }
              >
                Search
              </NavLink>
            </>
          )}
        </div>

        {/* User Actions - Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="relative">
              <img
                src={user?.photoURL || "https://via.placeholder.com/40"}
                alt="User profile"
                className="w-10 h-10 rounded-full ring-2 ring-Red cursor-pointer hover:ring-Racing-Red transition-all"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              />

              {/* user menu dropdown */}
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-56 rounded-xl shadow-2xl z-50 overflow-hidden"
                  style={{
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div className="bg-white/95 dark:bg-gray-800/95 border border-gray-100/50 dark:border-gray-700/50">
                    {/* User Profile Section */}
                    <div className="px-5 py-4 border-b border-gray-100/50 dark:border-gray-700/50 bg-gradient-to-r from-red-50/80 to-pink-50/80 dark:from-gray-700 dark:to-gray-800">
                      <div className="flex items-center space-x-3">
                        <img
                          src={
                            user?.photoURL || "https://via.placeholder.com/40"
                          }
                          alt="User"
                          className="w-10 h-10 rounded-full ring-2 ring-white/80 dark:ring-gray-600/80 shadow-md"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white/90 truncate">
                            {user.displayName || "User"}
                          </p>
                          <p className="text-xs text-gray-600/90 dark:text-gray-300/80 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 bg-white/80 dark:bg-gray-800/80">
                      <NavLink
                        to="/dashboard"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50/60 dark:hover:bg-gray-700/70 rounded-lg transition-all duration-200 group"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <svg
                          className="w-5 h-5 mr-3 text-Red group-hover:text-Racing-Red transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                          />
                        </svg>
                        Dashboard
                      </NavLink>

                      <button
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50/60 dark:hover:bg-gray-700/70 rounded-lg transition-all duration-200 group"
                        onClick={handleLogout}
                      >
                        <svg
                          className="w-5 h-5 mr-3 text-Red group-hover:text-Racing-Red transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign Out
                      </button>
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-2 text-xs text-center text-gray-500/80 dark:text-gray-400/80 border-t border-gray-100/50 dark:border-gray-700/50 bg-gray-50/60 dark:bg-gray-700/40">
                      Donora v1.0
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-Red px-4 py-2 text-white font-medium rounded-md hover:bg-Racing-Red transition-colors shadow-md"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          {user && (
            <div className="relative">
              <img
                src={user?.photoURL || "https://via.placeholder.com/40"}
                alt="User profile"
                className="w-8 h-8 rounded-full ring-2 ring-Red cursor-pointer"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              />

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-600 dark:bg-gray-800">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {user.displayName || "User"}
                    </p>
                  </div>
                  <NavLink
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-Red focus:outline-none -ml-2"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-3xl" />
            ) : (
              <FaBars className="text-3xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 shadow-xl absolute top-full left-0 right-0 z-10 border-t border-gray-200 dark:border-gray-700 text-center px-14">
          <div className="px-4 py-3 space-y-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-Red text-white"
                    : "text-gray-700 hover:bg-red-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/donation-request"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-Red text-white"
                    : "text-gray-700 hover:bg-red-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Donation Request
            </NavLink>

            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-Red text-white"
                    : "text-gray-700 hover:bg-red-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/funds"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-Red text-white"
                        : "text-gray-700 hover:bg-red-50 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Funds
                </NavLink>

                <NavLink
                  to="/search"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-Red text-white"
                        : "text-gray-700 hover:bg-red-50 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Search
                </NavLink>
              </>
            )}

            {!user && (
              <Link
                to="/login"
                className="block w-full text-center bg-Red text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-Racing-Red mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
