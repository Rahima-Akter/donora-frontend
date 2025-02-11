import logo from '../../assets/logo.PNG';
import loginImage2 from '../../assets/loginImg2.JPG';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';

const Login = () => {
    const { logIn } = useAuth();
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from || '/';;
    const [role, setRole] = useState('')

    const handlePasswordShow = () => {
        setShow(!show)
    }
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const rolesCredentials = {
        admin: { email: import.meta.env.VITE_Admin_Email, password: import.meta.env.VITE_Admin_Pass },
        volunteer: { email: import.meta.env.VITE_Volunteer_Email, password: import.meta.env.VITE_Volunteer_Pass },
        donor: { email: import.meta.env.VITE_Donor_Email, password: import.meta.env.VITE_Donor_Pass }
    };

    const handleRoleSelection = (selectRole) => {
        setRole(selectRole);
        setValue('email', rolesCredentials[selectRole]?.email || '');
        setValue('password', rolesCredentials[selectRole]?.password || '');
    }


    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        try {
            if (role) {
                await logIn(email, password, role)
                    .then(() => {
                        toast.success('Login Successfull')
                        navigate(from)
                    })
                reset();
                setError('');
            } else {
                await logIn(email, password)
                    .then(() => {
                        toast.success('Login Successfull')
                        navigate(from)
                    })
                reset();
                setError('');
            }
        } catch (error) {
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);

            // Firebase Authentication Errors
            if (error.code === 'auth/invalid-credential') {
                setError('Invalid credentials. Please try again!');
            } else if (error.code === 'auth/user-not-found') {
                setError('No account found with this email.');
            } else if (error.code === 'auth/wrong-password') {
                setError('Incorrect password. Please try again!');
            } else {
                setError('Failed to log in. Please try again.');
            }
        };

    };

    return (
        <div className="flex md:w-full w-11/12 bg-Red/5 max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl my-7 md:translate-y-[30%] lg:translate-y-0 translate-y-[8%]">
            <div className="hidden lg:flex lg:justify-center lg:items-center lg:w-1/2">
                <img src={loginImage2} className='w-full h-full' alt="" />
            </div>

            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2 border-l-2 border-l-Crimson-Red/5">
                <Link to="/" className="text-xs text-Red flex items-center hover:text-Racing-Red">
                    <span className="text-2xl -mt-1">←</span>Go back home
                </Link>
                <div className="flex justify-center mx-auto">
                    <img className="w-20" src={logo} alt="Logo" />
                </div>

                <p className="mt-3 text-xl text-center text-Red dark:text-gray-200">Welcome back!</p>

                <a
                    href="#"
                    className=" items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 hidden"
                >
                    <div className="px-4 py-4 flex justify-center items-center gap-2">
                        <FaGoogle className='text-Red text-2xl' />
                        <span className="font-bold text-Red">SignIn with Google</span>
                    </div>
                </a>

                <div className=" items-center justify-between mt-4 hidden">
                    <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
                    <p className="text-xs text-center text-Red/50 uppercase dark:text-gray-400 hover:underline">
                        or login with email
                    </p>
                    <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <div className='flex justify-center items-center gap-2'>
                        <button onClick={() => handleRoleSelection('admin')} className='font-bold text-white bg-Red rounded-xl px-3 py-1 hover:bg-red-600 text-xs'>Admin</button>
                        <button onClick={() => handleRoleSelection('volunteer')} className='font-bold text-white bg-Red rounded-xl px-3 py-1 hover:bg-red-600 text-xs'>Volunteer</button>
                        <button onClick={() => handleRoleSelection('donor')} className='font-bold text-white bg-Red rounded-xl px-3 py-1 hover:bg-red-600 text-xs'>Donor</button>
                    </div>
                    {/* Email Field */}
                    <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-Red dark:text-gray-200" htmlFor="LoggingEmailAddress">
                            Email Address
                        </label>
                        <input
                            id="LoggingEmailAddress"
                            type="email"
                            className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-Racing-Red"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Please enter a valid email address',
                                },
                            })}
                        />
                        {errors.email && <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="mt-4 relative">
                        <div className="flex justify-between">
                            <label className="block mb-2 text-sm font-medium text-Red dark:text-gray-200" htmlFor="loggingPassword">
                                Password
                            </label>
                            <a href="#" className="text-xs text-Red/70 dark:text-gray-300 hover:underline">
                                Forget Password?
                            </a>
                        </div>
                        <input
                            id="loggingPassword"
                            type={show ? "text" : 'password'}
                            className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm text-Red bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-Racing-Red"
                            {...register('password', { required: 'Password is required' })}
                        />
                        {error && <p className='text-xs text-Red font-bold drop-shadow-lg mt-1'>{error}</p>}
                        {/* eye icon */}
                        <div onClick={handlePasswordShow} className="text-Red absolute right-5 top-10">
                            {
                                show ? <FaEye /> : <FaEyeSlash />
                            }
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-Red rounded-lg hover:bg-Racing-Red focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                        >
                            Sign In
                        </button>
                    </div>
                </form>


                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    <Link to="/register" className="text-xs text-Red/70 uppercase dark:text-gray-400 hover:underline">
                        or sign up
                    </Link>
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                </div>
            </div>
        </div>
    );
};

export default Login;
