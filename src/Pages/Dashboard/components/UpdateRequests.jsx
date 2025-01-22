import logo from '../../../assets/logo.PNG';
import { Link, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendar2Date } from 'react-icons/bs';
import { IoTimeOutline } from 'react-icons/io5';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import useDistricts from '../../../Hooks/useDistricts';
import Spinner from '../../../Components/Spinner';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
const UpdateRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { id } = useParams();
    const [defaultTime] = useState(new Date());
    const { districts, upazilas } = useDistricts();

    // Fetch request data by ID
    const { data: request = {}, isLoading } = useQuery({
        queryKey: ['request', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/blood-request/${id}`);
            return data;
        }
    });

    // React Hook Form with default values
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            recipientName: request.recipientName || "",
            hospital: request.hospital || "",
            fullAddress: request.fullAddress || "",
            district: request.district || "",
            upazila: request.upazila || "",
            donationDate: request.donationDate ? new Date(request.donationDate) : null,
            donationTime: request.donationTime ? new Date(`1970-01-01T${request.donationTime}`) : defaultTime,
            details: request.details || "",
            bloodGroup: request.bloodGroup || "",
        },
    });

    if(isLoading) return <Spinner/>

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            const { recipientName, hospital, fullAddress, district, upazila, donationDate, donationTime, details, bloodGroup } = data;

            // formatt date and time to send to database
            const formattedDonationDate = donationDate ? donationDate.toISOString() : request.donationDate;
            const formattedDonationTime = donationTime ? format(donationTime, "HH:mm") : request.donationTime;

            // Construct request object
            const requestData = {
                userEmail: user?.email,
                userName: user?.displayName,
                recipientName: recipientName || request.recipientName,
                hospital: hospital || request.hospital,
                fullAddress: fullAddress || request.fullAddress,
                district: district || request.district,
                upazila: upazila || request.upazila,
                donationDate: formattedDonationDate,
                donationTime: formattedDonationTime,
                details: details || request.details,
                bloodGroup: bloodGroup || request.bloodGroup,
                status: "pending",
            };

            // Send update request to server
            const response = await axiosSecure.patch(`/blood-request-update/${id}`, requestData);

            if (response?.data?.modifiedCount > 0) {
                toast.success("Request Updated Successfully.");
                reset();
            } else {
                toast.error("Failed to update the request.");
            }
        } catch (err) {
            console.error("Error updating request:", err);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className='bg-red-100 py-4'>
            <div className="flex lg:w-10/12 w-11/12 mx-auto bg-Red/5 overflow-hidden rounded-lg shadow-lg dark:bg-gray-800 my-7">
                <div className="w-full px-6 py-8 md:px-8">
                    <Link to="/dashboard" className="text-xs text-Red flex items-center hover:text-Racing-Red">
                        <span className="text-2xl -mt-1">←</span>Go back home
                    </Link>
                    <div className="flex justify-center mx-auto">
                        <img className="w-20" src={logo} alt="Logo" />
                    </div>

                    <div className="px-4 py-4 flex justify-center items-center gap-2 border-t border-b border-white/50">
                        <span className="font-bold text-Red text-2xl">Update Blood Request</span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid grid-cols-1 md:grid-cols-2">
                        {/* User Name */}
                        <div className="mt-4 ml-5">
                            <label className="block mb-2 text-sm font-medium text-Red">User Name</label>
                            <input
                                type="text"
                                defaultValue={user?.displayName}
                                readOnly
                                className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg"
                            />
                        </div>

                        {/* User Email */}
                        <div className="mt-4 ml-5">
                            <label className="block mb-2 text-sm font-medium text-Red">User Email</label>
                            <input
                                type="email"
                                defaultValue={user?.email}
                                readOnly
                                className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg"
                            />
                        </div>

                        {/* Recipient Name */}
                        <div className="mt-4 ml-5">
                            <label className="block mb-2 text-sm font-medium text-Red">Recipient Name</label>
                            <input
                                type="text"
                                placeholder="Enter the recipient name"
                                className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg"
                                {...register('recipientName')}
                            />
                        </div>

                        {/* Hospital Address */}
                        <div className="mt-4 ml-5">
                            <label className="block mb-2 text-sm font-medium text-Red">Hospital Address</label>
                            <input
                                type="text"
                                placeholder="Enter the hospital address"
                                className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg"
                                {...register('hospital')}
                            />
                        </div>

                        {/* District Dropdown */}
                        <div className="mt-4 ml-5">
                            <label className="block mb-2 text-sm font-medium text-Red">Recipient District</label>
                            <select
                                className="block w-full px-4 py-2 text-Red/50 text-sm bg-white border rounded-lg"
                                {...register('district')}
                            >
                                <option value="">{request.district}</option>
                                {districts.map(d => (
                                    <option key={d.id} value={d.name}>{d.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Upazila Dropdown */}
                        <div className="mt-4 ml-5">
                            <label className="block mb-2 text-sm font-medium text-Red">Recipient Upazila</label>
                            <select
                                className="block w-full text-Red/50 px-4 py-2 text-sm bg-white border rounded-lg"
                                {...register('upazila')}
                            >
                                <option value="">{request.upazila}</option>
                                {upazilas.map(u => (
                                    <option key={u.id} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Donation Date */}
                        <div className="mt-4 ml-5 relative w-full">
                            <label className="block mb-2 text-sm font-medium text-Red">Donation Date</label>
                            <Controller
                                name="donationDate"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                    wrapperClassName='w-[95%]'
                                        selected={field.value}
                                        onChange={field.onChange}
                                        className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg focus:border-Racing-Red focus:ring focus:ring-Racing-Red focus:ring-opacity-50"
                                    />
                                )}
                            />
                            <BsCalendar2Date className="absolute top-10 right-7 text-Red pointer-events-none" />
                        </div>

                        {/* Donation Time */}
                        <div className="mt-4 ml-5 relative w-full">
                            <label className="block mb-2 text-sm font-medium text-Red">Donation Time</label>
                            <Controller
                                name="donationTime"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        wrapperClassName='w-[95%]'
                                        selected={field.value}
                                        onChange={field.onChange}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={5}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg focus:border-Racing-Red focus:ring focus:ring-Racing-Red focus:ring-opacity-50"
                                    />
                                )}
                            />
                            <IoTimeOutline className="absolute top-10 right-7 text-Red pointer-events-none" />
                        </div>

                        {/* Full Address */}
                        <div className="mt-4 ml-5 col-span-2">
                            <label className="block mb-2 text-sm font-medium text-Red">Full Address</label>
                            <input
                                type="text"
                                placeholder="Enter the full address"
                                className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg"
                                {...register('fullAddress')}
                            />
                        </div>

                        {/*  Details */}
                        <div className="mt-4 ml-5 md:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-Red">Additional Details</label>
                            <textarea
                                className="block w-full px-4 py-2 text-Red/50 font-semibold text-sm bg-white border rounded-lg"
                                rows="3"
                                placeholder="Write additional details..."
                                {...register('details')}
                            ></textarea>
                        </div>

                        {/* Blood Group */}
                        <div className="mt-4 ml-5 col-span-2">
                            <label className="block mb-2 text-sm font-medium text-Red">Blood Group</label>
                            <div className="flex flex-wrap gap-2">
                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                                    <label key={type} className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="bloodGroup"
                                            value={type}
                                            defaultChecked={type === request.bloodGroup}
                                            className="peer hidden"
                                            {...register("bloodGroup")}
                                        />
                                        <span className="py-2 px-2.5 border-2 hover:bg-white border-Red/20 text-Crimson-Red rounded-full flex justify-center items-center peer-checked:border-Red peer-checked:bg-Red peer-checked:text-white text-xs peer-checked:ring peer-checked:ring-offset-gray-300">
                                            {type}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 md:col-span-2 flex justify-center col-span-2">
                            <button
                                type="submit"
                                className="px-6 py-3 w-full text-white bg-Red rounded-lg hover:bg-Racing-Red"
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
