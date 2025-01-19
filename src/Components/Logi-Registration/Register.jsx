import logo from '../../assets/logo.PNG';
import loginImage from '../../assets/loginImg.PNG';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import useDistricts from '../../Hooks/useDistricts';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Register = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { signin, userProfile } = useAuth();
    const { districts, upazilas } = useDistricts();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const location = useLocation();
    const from = location?.state?.from || '/';

    const handlePasswordShow = () => {
        setShow(!show)
    }

    const handlePasswordShow2 = () => {
        setShow2(!show2)
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const photo = data.image[0];
            const formData = new FormData();
            formData.append("image", photo);

            // Sending image to imgbb server
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_SECRET_KEY}`,
                formData
            );

            const email = data.email;
            const name = data.name;
            const password = data.password;
            const image = response.data.data.display_url;
            const bloodGroup = data.bloodGroup;
            const district = data.district;
            const upazila = data.upazila;

            // User data object
            const userData = {
                email: email,
                name: name,
                image: image,
                bloodGroup: bloodGroup,
                district: district,
                upazila: upazila,
                role: "donor",
                status: "active",
            };

            // send user data to the database
            const res = await axiosPublic.post('/users', userData)
            if (res.data.message === 'user already exists') {
                toast.error('user already exists! Please SignIn instead')
                navigate('/login')
            } else {
                // Create user with Firebase
                const result = await signin(email, password)
                    .then(() => {
                        userProfile(name, image);
                        toast.success('Registration successfull');
                        navigate(from)
                    }).catch(err => {
                        console.log(err)
                    });
            }
            reset();
        } catch (err) {
            console.error("Error during registration:", err.message || err);
        }
    };

    return (
        <div className="flex lg:w-10/12 w-11/12 mx-auto bg-Red/5 overflow-hidden rounded-lg shadow-lg dark:bg-gray-800 my-7">
            <div className="hidden lg:flex lg:justify-center lg:items-center lg:w-1/2">
                <img src={loginImage} className='flex justify-center items-center my-auto ' alt="" />
            </div>

            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                <Link to="/" className="text-xs text-Red flex items-center hover:text-Racing-Red">
                    <span className="text-2xl -mt-1">←</span>Go back home
                </Link>
                <div className="flex justify-center mx-auto">
                    <img className="w-20" src={logo} alt="Logo" />
                </div>

                <p className="mt-3 text-xl text-center text-Red dark:text-gray-200">Welcome back!</p>

                <a
                    href="#"
                    className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                    <div className="px-4 py-4 flex justify-center items-center gap-2">
                        <FaGoogle className='text-Red text-2xl' />
                        <span className="font-bold text-Red">Sign in with Google</span>
                    </div>
                </a>

                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
                    <p className="text-xs text-center text-Red/50 uppercase dark:text-gray-400 hover:underline">
                        or signup with email
                    </p>
                    <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid grid-cols-1 md:grid-cols-2">
                    {/* name  Feild */}
                    <div className="mt-4 ml-5">
                        <label className="block mb-2 text-sm font-medium text-Red dark:text-gray-200" htmlFor="LoggingEmailAddress">
                            Your Name
                        </label>
                        <input
                            type="name"
                            className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-Racing-Red"
                            {...register('name', {
                                required: 'Name is required',
                            })}
                        />
                        {errors.name && <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="mt-4 ml-5">
                        <label className="block mb-2 text-sm font-medium text-Red dark:text-gray-200" htmlFor="LoggingEmailAddress">
                            Email Address
                        </label>
                        <input
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

                    {/* image input */}
                    <div className="mt-4 ml-5 col-span-2">
                        <label
                            htmlFor="image"
                            className="block mb-2 text-sm font-medium text-Red dark:text-gray-200"
                        >
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            id="image"
                            accept='image/*'
                            className="block w-full px-3 py-2 mt-2 text-sm text-Red bg-white border border-gray-200 rounded-lg file:bg-Red/10 file:text-Red file:font-bold file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                            {...register('image', {
                                required: 'Image is required',
                                validate: {
                                    fileType: (value) =>
                                        value[0]?.type.startsWith('image/') || 'File must be an image',
                                    fileSize: (value) =>
                                        value[0]?.size < 2 * 1024 * 1024 || 'File size must be less than 2MB',
                                },
                            })}
                        />
                        {errors.image && (
                            <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">
                                {errors.image.message}
                            </p>
                        )}
                    </div>


                    {/* Password Field */}
                    <div className="mt-4 ml-5 relative">
                        <div className="flex justify-between">
                            <label className="block mb-2 text-sm font-medium text-Red dark:text-gray-200" htmlFor="loggingPassword">
                                Password
                            </label>
                            <a href="#" className="text-xs text-Red/70 dark:text-gray-300 hover:underline">
                                Forget Password?
                            </a>
                        </div>
                        <input
                            type={show ? "text" : 'password'}
                            className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm text-Red bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-Racing-Red"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long',
                                },
                            })}
                        />

                        {errors.password && <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">{errors.password.message}</p>}

                        {/* eye icon */}
                        <div onClick={handlePasswordShow} className="text-Red absolute right-5 top-9">
                            {
                                show ? <FaEye ></FaEye> : <FaEyeSlash ></FaEyeSlash>
                            }
                        </div>

                    </div>

                    {/* Confirm Password Field */}
                    <div className="mt-4 ml-5 relative">
                        <label className="block mb-2 text-sm font-medium text-Red dark:text-gray-200" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type={show2 ? "text" : 'password'}
                            className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-Racing-Red"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: (value) =>
                                    value === watch('password') || 'Passwords do not match',
                            })}
                        />
                        {errors.confirmPassword && (
                            <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">{errors.confirmPassword.message}</p>
                        )}

                        {/* eye icon */}
                        <div onClick={handlePasswordShow2} className="text-Red absolute right-5 top-9">
                            {
                                show2 ? <FaEye ></FaEye> : <FaEyeSlash ></FaEyeSlash>
                            }
                        </div>
                    </div>

                    {/* district Dropdown */}
                    <div className="mt-4 ml-5">
                        <label className="block mb-2 text-sm font-medium text-Red" htmlFor="district">
                            Select Your District
                        </label>
                        <select
                            id="district"
                            className="block w-full px-4 py-2 text-sm text-Red bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:outline-none focus:ring focus:ring-Racing-Red"
                            {...register('district', { required: 'Please select your district' })}
                        >
                            <option value="">-- Select Your District --</option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.name}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                        {errors.district && (
                            <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">{errors.district.message}</p>
                        )}
                    </div>

                    {/* district Dropdown */}
                    <div className="mt-4 ml-5">
                        <label className="block mb-2 text-sm font-medium text-Red" htmlFor="upazila">
                            Select Your Upozila
                        </label>
                        <select
                            id="upazila"
                            className="block w-full px-4 py-2 text-sm text-Red bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:outline-none focus:ring focus:ring-Racing-Red"
                            {...register('upazila', { required: 'Please select your upazila' })}
                        >
                            <option value="">-- Select Your upazila --</option>
                            {upazilas.map((upazila) => (
                                <option key={upazila.id} value={upazila.name}>
                                    {upazila.name}
                                </option>
                            ))}
                        </select>
                        {errors.upazila && (
                            <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">{errors.upazila.message}</p>
                        )}
                    </div>

                    {/* blood group */}
                    <div className="mt-4 ml-5 col-span-2">
                        <label className="block mb-2 text-sm font-medium text-Red" htmlFor="blood">
                            Select Your Blood Type...
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                                <label key={type} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="bloodGroup"
                                        value={type}
                                        className="peer hidden"
                                        {...register("bloodGroup", { required: "Please select your Blood Group" })}
                                    />
                                    <span className="py-2 px-2.5 border-2  hover:bg-white border-Red/20 text-Crimson-Red rounded-full flex justify-center items-center peer-checked:border-Red peer-checked:bg-Red peer-checked:text-white text-xs peer-checked:ring peer-checked:ring-offset-gray-300">
                                        {type}
                                    </span>
                                </label>
                            ))}
                        </div>
                        {errors.bloodGroup && (
                            <p className="mt-2 text-xs text-Red font-bold drop-shadow-lg">
                                {errors.bloodGroup.message}
                            </p>
                        )}
                    </div>


                    {/* Submit Button */}
                    <div className="mt-6 col-span-2 ml-5">
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
                    <Link to="/login" className="text-xs text-Red/70 uppercase dark:text-gray-400 hover:underline">
                        or login
                    </Link>
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                </div>
            </div>
        </div>
    );
};

export default Register;
