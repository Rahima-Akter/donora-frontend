import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { IoEyeOutline } from 'react-icons/io5';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Spinner from '../../../Components/Spinner';
import { useEffect, useState } from 'react';
import HandleStatus from '../../../Hooks/HandleStatus';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyDonationRequest = () => {
    const [handleStatus, status] = HandleStatus();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    // Status filter state
    const [statuss, setStatus] = useState('');
    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ['requests', user?.email, statuss],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/blood-request/${user?.email}?status=${statuss}`);
            return data;
        },
    });

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    // Calculate pagination data
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const paginatedRequests = requests.slice(firstItem, lastItem);
    // Reset to page 1 when requests change
    useEffect(() => {
        setCurrentPage(1);
    }, [requests]);

    // Delete a request
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/blood-request/${id}`).then(() => {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your file has been deleted.',
                        icon: 'success',
                    });
                    refetch();
                });
            }
        });
    };

    const handleDone = async (id) => {
        handleStatus(id, 'done', '/request-status', refetch);
    };

    const handleCancel = async (id) => {
        handleStatus(id, 'canceled', '/request-status', refetch);
    };

    console.log(Math.ceil(requests.length / itemsPerPage))

    // Loading spinner
    if (isLoading) return <Spinner />;

    return (
        <div className="p-5">
            {/* Table Section */}
            <section className="py-8">
                <div className="flex justify-between items-center md:mb-0 mb-2 md:px-6 lg:px-0 px-0">
                    <p className="font-semibold uppercase text-Red md:text-lg text-xs mb-4">
                        My Donation Requests
                    </p>
                    {/* Filter Dropdown */}
                    <div className="join mb-2">
                        <select
                            onChange={(e) => setStatus(e.target.value)}
                            className="select select-bordered join-item bg-transparent rounded-lg border border-Red pb-1 px-5 text-Red font-bold appearance-none"
                        >
                            <option className="font-bold" value="">
                                Filter by
                            </option>
                            <option className="font-bold" value="pending">
                                Pending
                            </option>
                            <option className="font-bold" value="inprogress">
                                In Progress
                            </option>
                            <option className="font-bold" value="done">
                                Done
                            </option>
                            <option className="font-bold" value="canceled">
                                Canceled
                            </option>
                        </select>
                    </div>
                </div>

                {requests.length === 0 ? (
                    <div>
                        <img src="https://media1.tenor.com/m/YvOjHMyFlH0AAAAd/empty-box.gif" alt="" className='w-full h-full lg:mt-0 mt-12' />
                        <p className='font-bold drop-shadow-lg uppercase text-Red text-xl my-4 text-center '>No data to show</p>
                    </div>
                ) : (
                    <div className="w-full px-4 mx-auto sm:px-6 lg:px-0">
                        <div className="overflow-hidden bg-white shadow dark:bg-gray-900">
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-300">
                                    <thead className="text-xs text-Red uppercase bg-Red/10 dark:bg-gray-800 dark:text-gray-400">
                                        <tr>
                                            <th className="px-4 py-5 text-center">Recipient's Name</th>
                                            <th className="px-4 py-5 text-center">Status</th>
                                            <th className="px-4 py-5 text-center">Recipient's Location</th>
                                            <th className="px-4 py-5 text-center">Donation Date</th>
                                            <th className="px-4 py-5 text-center">Blood Type</th>
                                            <th className="px-4 py-5 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedRequests.map((request) => (
                                            <tr
                                                key={request._id}
                                                className="border-b border-red-100 hover:bg-gray-50"
                                            >
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700">
                                                    {request.recipientName}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-700">
                                                    {request.status}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500">
                                                    {request.district}, {request.upazila}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500">
                                                    {format(
                                                        new Date(request.donationDate),
                                                        'P'
                                                    )}
                                                    ,{' '}
                                                    {format(
                                                        new Date(
                                                            `1970-01-01T${request.donationTime}:00Z`
                                                        ),
                                                        'hh:mm a'
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-bold text-center">
                                                    {request.bloodGroup}
                                                </td>
                                                <td className="px-4 py-4 text-sm">
                                                    <div className="flex items-center gap-x-6">
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(request._id)
                                                            }
                                                            className="text-gray-500 hover:text-red-500"
                                                        >
                                                            <AiOutlineDelete className="text-2xl" />
                                                        </button>
                                                        <Link
                                                            to={`/dashboard/UpdateRequest/${request._id}`}
                                                            className="text-gray-500 hover:text-blue-500"
                                                        >
                                                            <BiEdit className="text-2xl" />
                                                        </Link>
                                                        <Link
                                                            to={`/dashboard/details/${request._id}`}
                                                            className="text-gray-500 hover:text-yellow-500"
                                                        >
                                                            <IoEyeOutline className="text-2xl" />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pagination Controls */}
                <div className="flex items-center md:justify-center justify-between md:gap-7 mt-6">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className={`flex items-center px-5 py-2 text-sm text-white capitalize transition-colors duration-200 bg-Red border rounded-md gap-x-2 hover:bg-red-600 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                        <span>Previous</span>
                    </button>

                    <div className="items-center lg:flex gap-x-3">
                        {Array.from({ length: Math.ceil(requests.length / itemsPerPage) }, (_, index) => index + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-2 py-1 text-sm rounded-md dark:bg-gray-800 ${currentPage === page
                                    ? "text-white bg-Red/60"
                                    : "text-gray-500 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        disabled={currentPage === Math.ceil(requests.length / itemsPerPage)}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(requests.length / itemsPerPage)))}
                        className={`flex items-center px-5 py-2 text-sm text-white capitalize transition-colors duration-200 bg-Red border rounded-md gap-x-2 hover:bg-red-600 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 ${currentPage === Math.ceil(requests.length / itemsPerPage) ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        <span>Next</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </button>
                </div>

            </section>
        </div>
    );
};

export default MyDonationRequest;
