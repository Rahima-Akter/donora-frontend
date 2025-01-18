import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IoEyeOutline } from 'react-icons/io5';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Spinner from '../../../Components/Spinner';
import { useState } from 'react';

const MyDonationRequest = () => {
    const { user } = useAuth();
    const [status, setStatus] = useState('')
    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ['requests', user?.email, status],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:5000/blood-request/${user?.email}?status=${status}`);
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
                axios.delete(`http://localhost:5000/blood-request/${id}`)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                refetch()
            }
        });

    }

    if (isLoading) return <Spinner />
    return (
        <div className='p-5'>
            {/* table */}
            <section className="py-8">
                <div className='flex justify-between items-center'>
                    <p className='font-semibold uppercase text-Red text-lg mb-4'>my donation requests</p>
                    {/* button group for filter */}
                    <div className="join mb-2">
                        <select 
                        onChange={(e) => setStatus(e.target.value)}
                        className="select select-bordered join-item bg-Red rounded-lg border border-white pb-1 px-2 text-white font-bold">
                            <option className='font-bold' value=''>Filter by</option>
                            <option className='font-bold' value='pending'>pending</option>
                            <option className='font-bold' value='inprogress'>inprogress</option>
                            <option className='font-bold' value='done'>done</option>
                            <option className='font-bold' value='cancled'>cancled</option>
                        </select>
                    </div>
                </div>

                {
                    requests.length === 0 && <p className='font-bold drop-shadow-lg uppercase text-Red text-xl mb-4 text-center'>No data to show</p> || (<div className="min-w-full px-4 mx-auto sm:px-6 lg:px-0">
                        <div className="overflow-hidden bg-white shadow rounded-lg dark:bg-gray-900">
                            <div className="overflow-x-auto">
                                <table className="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-300">
                                    <thead className="text-xs text-Red uppercase bg-Red/10 dark:bg-gray-800 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="text-center px-4 py-5 whitespace-nowrap">Recipient's Name</th>
                                            <th scope="col" className="text-center px-4 py-5 whitespace-nowrap">Status</th>
                                            <th scope="col" className="text-center px-4 py-5 whitespace-nowrap">Recipient's Location</th>
                                            <th scope="col" className="text-center px-4 py-5 whitespace-nowrap">Donation Date</th>
                                            <th scope="col" className="text-center px-4 py-5 whitespace-nowrap">Blood Type</th>
                                            {
                                                requests.map(request => (request.status === 'inprogress' && <th key={request._id} scope="col" className="text-center px-4 py-5 whitespace-nowrap">Donor Info</th>))
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
                                                    <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${request.status === "pending" && 'bg-amber-100/60' ||
                                                        request.status === "inprogress" && 'bg-sky-100/60' || request.status === "done" && 'bg-emerald-100/60' ||
                                                        request.status === "cancled" && 'bg-red-100/60'
                                                        } dark:bg-gray-800`}>
                                                        <span className={`h-1.5 w-1.5 rounded-full ${request.status === "pending" && 'bg-amber-500' ||
                                                            request.status === "inprogress" && 'bg-sky-500' || request.status === "done" && 'bg-emerald-500' ||
                                                            request.status === "cancled" && 'bg-red-500'
                                                            }`}></span>
                                                        <h2 className={`text-xs font-normal ${request.status === "pending" && 'text-amber-500' ||
                                                            request.status === "inprogress" && 'text-sky-500' || request.status === "done" && 'text-emerald-500' ||
                                                            request.status === "cancled" && 'text-red-500'
                                                            }`}>{request.status}</h2>
                                                    </div>
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
                                                        <button onClick={() => handleDelete(request._id)} className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                                            <AiOutlineDelete className='text-2xl' />
                                                        </button>
                                                        <Link to={`/dashboard/UpdateRequest/${request._id}`} className="text-gray-500 transition-colors duration-200 dark:hover:text-blue-500 dark:text-gray-300 hover:text-blue-500 focus:outline-none">
                                                            <BiEdit className='text-2xl' />
                                                        </Link>
                                                        <Link to={`/dashboard/details/${request._id}`} className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                                            <IoEyeOutline className='text-2xl' />
                                                        </Link>
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

export default MyDonationRequest;