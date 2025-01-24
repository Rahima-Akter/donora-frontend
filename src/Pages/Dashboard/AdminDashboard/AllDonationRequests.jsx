import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { IoEyeOutline } from 'react-icons/io5';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../../Components/Spinner';
import { useState } from 'react';
import HandleStatus from '../../../Hooks/HandleStatus';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useGetRole from '../../../Hooks/useGetRole';

const AllDonationRequests = () => {
    const [userRole] = useGetRole();
    const [handleStatus, status] = HandleStatus();
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [statuss, setStatus] = useState('')
    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ['requests', statuss],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-blood-requests?status=${statuss}`);
            return data;
        }
    });
    // delete a request
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/blood-request/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch()
                    })
            }
        });

    }
    const handleDone = async (id) => {
        handleStatus(id, 'done', '/request-status', refetch)
    }
    const handleCancel = async (id) => {
        handleStatus(id, "canceled", '/request-status', refetch)
    }

    if (isLoading) return <Spinner />

    return (
        <div className='p-4'>
            <section className="">
                <div className='flex justify-between items-center lg:px-3 md:px-6 px-0'>
                    <p className='font-semibold uppercase text-Red text-xs md:text-lg mb-4'>All donation requests({requests.length})</p>
                    {/* button group for filter */}
                    <div className="join mb-2">
                        <select
                            onChange={(e) => setStatus(e.target.value)}
                            className="select select-bordered join-item bg-Red rounded-lg border border-white pb-1 px-2 text-white font-bold">
                            <option className='font-bold'>Filter by</option>
                            <option className='font-bold' value=''>default</option>
                            <option className='font-bold' value='pending'>pending</option>
                            <option className='font-bold' value='inprogress'>inprogress</option>
                            <option className='font-bold' value='done'>done</option>
                            <option className='font-bold' value='canceled'>canceled</option>
                        </select>
                    </div>
                </div>

                {
                    requests.length === 0 && <p className='font-bold drop-shadow-lg uppercase text-Red text-xl mb-4 text-center'>No data to show</p> || (<div className="w-full px-0 mx-auto sm:px-6 lg:px-3">
                        <div className="overflow-hidden bg-white shadow dark:bg-gray-900">
                            <div className="overflow-x-auto">
                                <table className="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-300">
                                    <thead className="text-xs w-full text-Red uppercase bg-Red/10 dark:bg-gray-800 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="text-center px-4 py-5 whitespace-nowrap">Recipient's Name</th>
                                            <th scope="col" className="text-center px-4 py-5 whitespace-nowrap">Status</th>
                                            <th scope="col" className="text-center px-4 py-5 whitespace-nowrap">Recipient's Location</th>
                                            <th scope="col" className="text-center px-4 py-5 whitespace-nowrap">Donation Date</th>
                                            <th scope="col" className="text-center px-4 py-5 whitespace-nowrap">Blood Type</th>
                                            {
                                                requests.some(request => request.status === 'inprogress') && (
                                                    <th scope="col" className="text-center px-4 py-5 whitespace-nowrap">Donor Info</th>
                                                )
                                            }
                                            <th scope="col" className="text-center px-4 py-5 whitespace-nowrap">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            requests.map(request => <tr key={request._id} className='border-b border-red-100 hover:bg-gray-50'>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <h2 className="font-medium text-gray-800 dark:text-white">{request.recipientName}</h2>
                                                    </div>
                                                </td>
                                                <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {
                                                        request.status === 'inprogress' && <div className='flex items-center gap-1 mt-1'>
                                                            <button onClick={() => handleDone(`${request._id}`)} className='text-xs font-semibold bg-green-500 hover:bg-green-600 text-white rounded-md px-2 py-1'>Done</button>
                                                            <button onClick={() => handleCancel(`${request._id}`)} className='text-xs font-semibold bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1'>Cancel</button>
                                                        </div> || request.status === 'pending' && <p className='text-amber-500 rounded-lg text-center py-1 px-3 bg-amber-100/50 cursor-not-allowed'>pending</p> ||
                                                        request.status === 'done' && <p className='text-emerald-500 rounded-lg text-center py-1 px-3 bg-emerald-100/50 cursor-not-allowed'>done</p> ||
                                                        request.status === 'canceled' && <p className='text-red-500 rounded-lg text-center px-3 py-1 bg-red-100/50 cursor-not-allowed'>canceled</p>
                                                    }
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{request.district},<span>{request.upazila}</span></td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{format(new Date(request.
                                                    donationDate), 'P')}, <span>{format(new Date(`1970-01-01T${request.donationTime}:00Z`), "hh:mm a")}</span>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center font-bold">{request.
                                                    bloodGroup}</td>
                                                {
                                                    request.status === 'inprogress' ? (
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div className="flex flex-col">
                                                                <p className="px-3 py-1 text-xs text-center">{user?.displayName}</p>
                                                                <p className="px-3 py-1 text-xs">{user?.email}</p>
                                                            </div>
                                                        </td>
                                                    ) : (
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap text-center mt-6 font-semibold text-Red/50">N/A</td>
                                                    )
                                                }
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div className="flex items-center gap-x-6">
                                                        <button onClick={() => handleDelete(request._id)}
                                                            disabled={userRole !== 'admin'}
                                                            className={`text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none ${userRole !== 'admin' && 'cursor-not-allowed opacity-60'}`}>
                                                            <AiOutlineDelete className='text-2xl' />
                                                        </button>
                                                        <button onClick={() => navigate(`/dashboard/UpdateRequest/${request._id}`)}
                                                            disabled={userRole !== 'admin'}
                                                            className={`text-gray-500 transition-colors duration-200 dark:hover:text-blue-500 dark:text-gray-300 hover:text-blue-500 focus:outline-none ${userRole !== 'admin' && 'cursor-not-allowed opacity-60'}`}>
                                                            <BiEdit className='text-2xl' />
                                                        </button>
                                                        <button onClick={() => navigate(`/dashboard/details/${request._id}`)}
                                                            disabled={userRole !== 'admin'}
                                                            className={`text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none ${userRole !== 'admin' && 'cursor-not-allowed opacity-60'}`}>
                                                            <IoEyeOutline className='text-2xl' />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>)
                }

            </section>
        </div>
    );
};

export default AllDonationRequests;