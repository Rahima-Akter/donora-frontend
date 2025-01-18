import logo from '../../../assets/logo.PNG';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useDistricts from '../../../Hooks/useDistricts';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendar2Date } from 'react-icons/bs';
import { IoTimeOutline } from 'react-icons/io5';
import { format } from 'date-fns';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateRequests = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [defaultTime] = useState(new Date());
    const { districts, upazilas } = useDistricts();
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm();



    const onSubmit = async (data) => {
        try {
            const { recipientName, hospital, fullAddress, district, upazila, donationDate, donationTime, details, bloodGroup } = data;
            const email = user?.email;
            const name = user?.displayName;

            // User data object
            const requestData = {
                userEmail: email,
                userName: name,
                recipientName,
                hospital,
                fullAddress,
                district,
                upazila,
                donationDate: donationDate.toISOString(),
                donationTime: format(donationTime, "HH:mm"), 
                details,
                bloodGroup,
                status: "pending",
            };

            // Send request to the server
            const response = await axios.post('http://localhost:5000/blood-request', requestData);

            if (response?.data?.insertedId) {
                toast.success('Request Successful.....');
                reset();
                navigate('/dashboard/my-donation-requests')
            } else {
                console.error("Unexpected response:", response);
                toast.error('Failed to submit the request.');
            }
        } catch (err) {
            console.error("Error during blood request:", err.response?.data || err.message || err);
            toast.error("Failed to send the blood request. Please try again later.");
        }
    };


    return (
        <div className='bg-red-100 py-4'>
            <div className="flex lg:w-10/12 w-11/12 mx-auto bg-Red/5 overflow-hidden rounded-lg shadow-lg dark:bg-gray-800 my-7">
                <div className="w-full px-6 py-8 md:px-8">
                    <Link to="/" className="text-xs text-Red flex items-center hover:text-Racing-Red">
                        <span className="text-2xl -mt-1">←</span>Go back home
                    </Link>
                    <div className="flex justify-center mx-auto">
                        <img className="w-20" src={logo} alt="Logo" />
                    </div>

                    <div className="px-4 py-4 flex justify-center items-center gap-2 border-t border-b border-white/50">
                        <span className="font-bold text-Red text-2xl">Request For Boold</span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid grid-cols-1 md:grid-cols-2">
                        {/* user name Feild */}
                        <div className="mt-4 ml-5">
                            <label className="block mb-2 text-sm font-medium text-Red dark:text-gray-200" htmlFor="LoggingEmailAddress">
                                User Name
                            </label>
                            <input
                                type="text"
                                defaultValue={user?.displayName}
                                readOnly
                                className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-Racing-Red"
                                {...register('userName')}
                            />
                        </div>

                        {/* user email Feild */}
                        <div className="mt-4 ml-5">
                            <label className="block mb-2 text-sm font-medium text-Red dark:text-gray-200" htmlFor="LoggingEmailAddress">
                                User Email
                            </label>
                            <input
                                type="email"
                                defaultValue={user?.email}
                                readOnly
                                className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-Racing-Red"
                                {...register('userEmail')}
                            />
                        </div>

                        {/* recipient name */}
                        <div className="mt-4 ml-5">
                            <label className="block mb-2 text-sm font-medium text-Red dark:text-gray-200" htmlFor="LoggingEmailAddress">
                                Recipient Name
                            </label>
                            <input
                                type="name"
                                placeholder='Enter the recipient name'
                                className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:ring-opacity-40 placeholder-Red/40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-Racing-Red"
                                {...register('recipientName', {
                                    required: 'Recipient name is required',
                                })}
                            />
                            {errors.recipientName && <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">{errors.recipientName.message}</p>}
                        </div>

                        {/* hospital address Field */}
                        <div className="mt-4 ml-5">
                            <label className="block mb-2 text-sm font-medium text-Red dark:text-gray-200" htmlFor="LoggingEmailAddress">
                                Hospital Address
                            </label>
                            <input
                                type="text"
                                placeholder='Enter the hospital address for blood donation'
                                className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-Racing-Red placeholder-Red/40"
                                {...register('hospital', {
                                    required: 'Hospital address is required'
                                })}
                            />
                            {errors.hospital && <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">{errors.hospital.message}</p>}
                        </div>

                        {/* full address Field */}
                        <div className="mt-4 ml-5 relative">
                            <div className="flex justify-between">
                                <label className="block mb-2 text-sm font-medium text-Red dark:text-gray-200" htmlFor="loggingPassword">
                                    Full Address
                                </label>
                            </div>
                            <input
                                type="text"
                                placeholder='Enter the full address'
                                className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm text-Red bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-Racing-Red placeholder-Red/40"
                                {...register('fullAddress', {
                                    required: 'Full address is required',
                                })}
                            />

                            {errors.fullAddress && <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">{errors.fullAddress.message}</p>}
                        </div>

                        {/* district Dropdown */}
                        <div className="mt-4 ml-5">
                            <label className="block mb-2 text-sm font-medium text-Red" htmlFor="district">
                                Select Recipient District
                            </label>
                            <select
                                id="district"
                                className="block w-full px-4 py-2 text-sm text-Red bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:outline-none focus:ring focus:ring-Racing-Red"
                                {...register('district', { required: 'Please select recipient district' })}
                            >
                                <option value="">-- Select Recipient District --</option>
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

                        {/* upazila Dropdown */}
                        <div className="mt-4 ml-5">
                            <label className="block mb-2 text-sm font-medium text-Red" htmlFor="upazila">
                                Select Recipient Upazila
                            </label>
                            <select
                                id="upazila"
                                className="block w-full px-4 py-2 text-sm text-Red bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:outline-none focus:ring focus:ring-Racing-Red"
                                {...register('upazila', { required: 'Please select recipient upazila' })}
                            >
                                <option value="">-- Select Recipient upazila --</option>
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

                        {/* donation date */}
                        <div className="mt-4 ml-5 relative">
                            <label className="block mb-2 text-sm font-medium text-Red">
                                Select the date for donation
                            </label>
                            {/* Using Controller to manage DatePicker */}
                            <Controller
                                name="donationDate"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        wrapperClassName="w-full"
                                        placeholderText="Select a date for donation"
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        className="w-full px-4 py-2 text-Red/50 font-semibold text-sm text-Red bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-Racing-Red placeholder-Red/40"
                                    />
                                )}
                                rules={{ required: "Donation date is required" }}
                            />
                            {errors.donationDate && (
                                <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">{errors.donationDate.message}</p>
                            )}
                            <BsCalendar2Date className='absolute top-10 right-3 text-Red' />
                        </div>

                        {/* time field */}
                        <div className="mt-4 ml-5 relative">
                            <label className="block mb-2 text-sm font-medium text-Red">
                                Select a time for donation
                            </label>
                            <Controller
                                name="donationTime"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        wrapperClassName="w-full"
                                        placeholderText="Select a time for donation"
                                        selected={field.value || defaultTime}
                                        onChange={(time) => field.onChange(time)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={5}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        className="w-full px-4 py-2 text-Red/50 font-semibold text-sm text-Red bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-Racing-Red placeholder-Red/40"
                                    />
                                )}
                                rules={{ required: "Donation time is required" }}
                            />
                            {errors.donationTime && (
                                <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">{errors.donationTime.message}</p>
                            )}
                            <IoTimeOutline className="absolute top-10 right-3 text-Red" />
                        </div>

                        {/* details Field */}
                        <div className="mt-4 ml-5">
                            <div className="flex justify-between">
                                <label className="block mb-2 text-sm font-medium text-Red dark:text-gray-200" htmlFor="loggingPassword">
                                    Detaills
                                </label>
                            </div>
                            <textarea
                                type="text"
                                placeholder='Enter the the details about your request'
                                className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm text-Red bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-Racing-Red focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-Racing-Red placeholder-Red/40"
                                {...register('details', {
                                    required: 'Details is required',
                                })}
                            />

                            {errors.details && <p className="text-xs text-Red font-bold drop-shadow-lg mt-1">{errors.details.message}</p>}
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
                                            {...register("bloodGroup", { required: "Please select Blood Type" })}
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
                                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-Red rounded-lg hover:bg-Racing-Red focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 uppercase"
                            >
                               Update Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateRequests;
