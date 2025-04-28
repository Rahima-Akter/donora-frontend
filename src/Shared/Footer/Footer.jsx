import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import footerBg from "../../assets/footerBg.JPg";
import footerBg2 from "../../assets/darkFooter.JPG";
import logo from "../../assets/logo.PNG";
import { MdDoubleArrow } from "react-icons/md";
import { useTheme } from "../../contexts/ThemeProvider/ThemeProvider";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <div
      className="bg-gray-50 dark:bg-gray-900 relative dark:border-t dark:border-Red/50"
      style={{
        backgroundImage:
          theme === "light"
            ? `url(${footerBg})`
            : 'url("https://c4.wallpaperflare.com/wallpaper/492/702/527/wave-red-lines-light-wallpaper-preview.jpg")',
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <footer className="pt-12 relative w-11/12 mx-auto z-10">
        <div className="max-w-7xl mx-auto px-4 lg:flex lg:justify-between text-gray-700 dark:text-white">
          {/* Left Section: Logo & Description */}
          <div className="mb-8 lg:mb-0 max-w-sm">
            <div className="flex items-center text-red-600 text-2xl font-bold -ml-10">
              <div className="flex items-center justify-center">
                <img src={logo} className="w-28 -mr-7" alt="logo" />
              </div>
              DONORA
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-300 mb-4">
              This site connects compassionate donors with those whose lives
              depend on blood. Whether you're here to give or receive, our
              mission is simple, to make blood donations easier,
              faster, and more accessible for everyone.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-white text-lg hover:scale-110 duration-700 bg-red-600 py-2 px-4 rounded"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-white text-lg hover:scale-110 duration-700 bg-red-600 py-2 px-4 rounded"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-white text-lg hover:scale-110 duration-700 bg-red-600 py-2 px-4 rounded"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-white text-lg hover:scale-110 duration-700 bg-red-600 py-2 px-4 rounded"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-8 lg:mb-0">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b-2 border-red-600 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-300">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-800 flex items-center hover:ml-2 duration-700"
                >
                  <span>
                    <MdDoubleArrow className="text-Red text-lg mr-1" />
                  </span>
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-800 flex items-center hover:ml-2 duration-700"
                >
                  <span>
                    <MdDoubleArrow className="text-Red text-lg mr-1" />
                  </span>
                  Charity
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-80 flex items-center hover:ml-2 duration-700"
                >
                  <span>
                    <MdDoubleArrow className="text-Red text-lg mr-1" />
                  </span>
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-800 flex items-center hover:ml-2 duration-700"
                >
                  <span>
                    <MdDoubleArrow className="text-Red text-lg mr-1" />
                  </span>
                  Term & Condition
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="mb-8 lg:mb-0">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b-2 border-red-600 inline-block">
              Our Address
            </h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-300">
              <li className="flex items-start">
                <GoLocation className="text-red-600 mr-2" />
                <span>100 Smith Street Collingwood VIC 3066 AU</span>
              </li>
              <li className="flex items-center">
                <HiOutlinePhone className="text-red-600 mr-2" />
                +1 (555) 000-0000
              </li>
              <li className="flex items-center">
                <HiOutlineMail className="text-red-600 mr-2" />
                donora@mail.com
              </li>
            </ul>
          </div>

          {/* Work Hours */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b-2 border-red-600 inline-block">
              Work Hours
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-2 uppercase">
              everyday, anytime - 24/7
            </p>
            <h4 className="text-sm text-gray-800 dark:text-gray-300 font-semibold mb-5">
              Need For Help? Call Us
            </h4>
            <a
              href="#contact"
              className="inline-block bg-red-600 text-white text-lg font-medium py-3 px-8 rounded-lg hover:bg-red-700 transition"
            >
              <HiOutlinePhone className="inline mr-2" />
              Contact Us
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 dark:border-Red/70 dark:text-gray-300 mt-8 pt-4 pb-6 text-center text-xs text-gray-600">
          Copyright © DONORA {new Date().getFullYear()}. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
