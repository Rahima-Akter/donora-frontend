import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useDistricts from "../../../Hooks/useDistricts";
import toast from "react-hot-toast";
import axios from "axios";
import Spinner from "../../../Components/Spinner";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const Profile = () => {
    const { districts, upazilas } = useDistricts();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isEditable, setIsEditable] = useState(false);

    const { data: users = {}, isLoading, refetch } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/single-user/${user?.email}`);
            return data;
        },
        onSuccess: (data) => reset(data),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            bloodGroup: users.bloodGroup || "",
        }
    });

    const onSubmit = async (data) => {
        setIsEditable(false)
        let image = users.image;
        if (data.image && data.image.length > 0) {
            const photo = data.image[0];
            const formData = new FormData();
            formData.append("image", photo);

            try {
                const response = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_SECRET_KEY}`,
                    formData
                );
                image = response.data.data.display_url;
            } catch (err) {
                console.error("Image upload failed:", err.message || err);
                toast.error("Failed to upload image. Please try again.");
                return;
            }
        }

        const userData = {
            name: data.name || users.name,
            image,
            bloodGroup: data.bloodGroup || users.bloodGroup,
            district: data.district || users.district,
            upazila: data.upazila || users.upazila,
        };

        try {
            const res = await axiosSecure.patch(`/update-user/${user?.email}`, userData);
            if (res.data.modifiedCount) {
                refetch();
                toast.success("Profile updated successfully!");
            } else {
                toast.error("Profile update failed!");
            }
        } catch (err) {
            console.error("Error updating profile:", err.message || err);
        }
    };
    if (isLoading) return <Spinner />
    return (
        <div className='-z-10 absolute inset-0 min-h-screen' style={{
            backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20240102/pngtree-asian-style-black-texture-banner-brush-stroke-object-with-japanese-wave-image_13901042.png')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            objectFit: 'cover',
            minHeight: '100vh',
        }}>
            <Helmet>
                <title>Dashboard || Profile</title>
            </Helmet>

            <div className="w-full bg-white/30 backdrop-blur-sm h-full relative z-10">
                <div className="md:w-4/6 lg:w-3/6 w-full mx-auto px-5 lg:py-6 py-32 lg:translate-x-[25%] -translate-y-6 md:-translate-y-0">
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-Red text-2xl text-center md:ml-4">{users.name}'s Profile</h1>
                        <div className="md:mt-6 ml-3 relative z-50">
                            <button
                                onClick={() => {
                                    if (!isEditable) {
                                        setIsEditable(true);
                                    }
                                }}
                                className={`${!isEditable && "px-3 py-2 text-xs font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-Red rounded-lg hover:bg-Racing-Red focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"}`}
                            >
                                {isEditable ? "" : "Edit Profile"}
                            </button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-1 grid grid-cols-1 md:grid-cols-2">
                        {/* name  Feild */}
                        <div className="mt-4 md:ml-5 mr-3 md:mr-0">
                            <label className="block mb-2 text-sm font-medium text-Red dark:text-gray-200" htmlFor="name">
                                Your Name
                            </label>
                            <input
                                type="name"
                                defaultValue={users.name}
                                className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-Racing-Red"
                                {...register('name')}
                                disabled={!isEditable}
                            />
                            {errors.name && <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Email Field */}
                        <div className="mt-4 md:ml-5">

                            <label className="block mb-2 text-sm font-medium text-Red dark:text-gray-200" htmlFor="LoggingEmailAddress">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={users?.email}
                                readOnly
                                className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-Racing-Red"
                                {...register('email', {
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Please enter a valid email address',
                                    },
                                })}
                                disabled={!isEditable}
                            />
                            {errors.email && <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">{errors.email.message}</p>}
                        </div>

                        {/* image input */}
                        <div className="mt-4 md:ml-5 col-span-2">
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
                                    validate: {
                                        fileType: (value) =>
                                            !value.length || value[0]?.type.startsWith('image/') || 'File must be an image',
                                        fileSize: (value) =>
                                            !value.length || value[0]?.size < 2 * 1024 * 1024 || 'File size must be less than 2MB',
                                    },
                                })}
                                disabled={!isEditable}
                            />
                            {errors.image && (
                                <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">
                                    {errors.image.message}
                                </p>
                            )}

                        </div>

                        <div className="flex flex-row col-span-2">

                            {/* users avatar */}
                            <div className="mt-4 md:ml-5 w-2/5">
                                <p className="block mb-2 text-sm font-medium text-Red dark:text-gray-200">Avatar</p>
                                <img
                                    src={users.image}
                                    className="w-[90%] h-[140px] object-cover rounded-md"
                                    alt="Avatar"
                                />
                            </div>

                            <div className="w-3/5 mt-3">
                                {/* district Dropdown */}
                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium text-Red" htmlFor="district">
                                        Your District
                                    </label>
                                    <select
                                        id="district"
                                        className="block w-full px-4 py-2 text-sm text-Red bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:outline-none focus:ring focus:ring-Racing-Red"
                                        {...register('district')}
                                        disabled={!isEditable}
                                    >
                                        <option value="">{users.district}</option>
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
                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium text-Red" htmlFor="upazila">
                                        Your Upozila
                                    </label>
                                    <select
                                        id="upazila"
                                        className="block w-full px-4 py-2 text-sm text-Red bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:outline-none focus:ring focus:ring-Racing-Red"
                                        {...register('upazila')}
                                        disabled={!isEditable}
                                    >
                                        <option value="">{users.upazila}</option>
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
                            </div>
                        </div>

                        {/* blood group */}
                        <div className="mt-4 ml-4 col-span-2">
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
                                            {...register("bloodGroup")}
                                            disabled={!isEditable}
                                            defaultChecked={type === users.bloodGroup}
                                        />
                                        <span className="py-2 px-2.5 border-2 bg-white hover:bg-transparent border-Red text-Red rounded-full flex justify-center items-center peer-checked:border-Red peer-checked:bg-Red peer-checked:text-white text-xs peer-checked:ring peer-checked:ring-offset-gray-300">
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
                        {
                            isEditable && <div className="mt-6 col-span-2 ml-3">
                                <button
                                    type="submit"
                                    className="px-3 py-2 text-xs font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-Red rounded-lg hover:bg-Racing-Red focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                                >
                                    update
                                </button>
                            </div>
                        }
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Profile;