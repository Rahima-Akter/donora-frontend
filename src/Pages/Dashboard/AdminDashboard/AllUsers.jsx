import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Spinner from '../../../Components/Spinner';
import HandleStatus from '../../../Hooks/HandleStatus';
import useRole from '../../../Hooks/useRole';
import { useEffect, useState } from 'react';
import ThemeToggleButton from '../../../contexts/ThemeProvider/ThemeToggleButton';
import { Helmet } from 'react-helmet-async';

const AllUsers = () => {
    const [handleStatus] = HandleStatus();
    const [handleRole] = useRole();
    const axiosSecure = useAxiosSecure();
    const [statusFilter, setStatusFilter] = useState('')
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', statusFilter],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/get-all-users?status=${statusFilter}`)
            return data;
        }
    });

    // pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const paginatedRequests = users.slice(firstItem, lastItem);
    useEffect(() => {
        setCurrentPage(1);
    }, [users])

    const handleBlock = (id) => {
        handleStatus(id, 'block', '/user-status', refetch)
    }
    const handleActive = (id) => {
        handleStatus(id, 'active', '/user-status', refetch)
    }

    const handleMakeAdmin = (id) => {
        handleRole(id, 'admin', refetch)
    }
    const handleMakeVolunteer = (id) => {
        handleRole(id, 'volunteer', refetch)
    }

    if (isLoading) return <Spinner />
    return (
        <div className='md:p-6 p-3 overflow-auto'>
            <Helmet>
                <title>Dashboard || all users</title>
            </Helmet>
            <section className='lg:w-[90%] mx-auto'>
                {
                    users.length === 0 &&
                    <div>
                        <img src="https://media1.tenor.com/m/YvOjHMyFlH0AAAAd/empty-box.gif" alt="" className='lg:translate-x-11 w-full h-full lg:mt-0 mt-12' />
                        <p className='font-bold drop-shadow-lg uppercase text-Red text-xl my-4 text-center lg:translate-x-11'>No data to show</p>
                    </div>
                    || <>
                        <div className='flex justify-between items-center mb-1'>
                            <p className='font-semibold uppercase text-Red md:text-sm text-xs mb-4'>All Registered users</p>
                            {/* button group for filter */}
                            <div className="join mb-2">
                                <select
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="bg-transparent rounded-lg border border-Red hover:bg-red-50 px-4 py-2 text-Red font-bold text-xs appearance-none focus:outline-none md:!pr-16 pr-12">
                                    <option className='font-bold'>Filter by</option>
                                    <option className='font-bold' value=''>default</option>
                                    <option className='font-bold' value='active'>active</option>
                                    <option className='font-bold !px-5' value='block'>block</option>
                                </select>
                            </div>
                        </div>
                        {/* Table Section */}
                        <div className="overflow-hidde shadow rounded-lg dark:bg-gray-900">
                            <div className="overflow-x-auto rounded-lg">
                                <table className="min-w-full table-auto text-sm text-gray-500 dark:text-gray-300">
                                    <thead className="bg-Red text-white dark:bg-gray-700 text-left">
                                        <tr>
                                            <th scope="col" className="pl-8 px-2 py-3 whitespace-nowrap">Avatar</th>
                                            <th scope="col" className="px-2 py-3 whitespace-nowrap">Name</th>
                                            <th scope="col" className="px-2 py-3 whitespace-nowrap">Status</th>
                                            <th scope="col" className="px-2 py-3 whitespace-nowrap">Role</th>
                                            <th scope="col" className="px-2 py-3 whitespace-nowrap">Email</th>
                                            <th scope="col" className="px-2 py-3 text-center whitespace-nowrap">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">

                                        {
                                            paginatedRequests.map(user =>
                                                <tr key={user._id} className='hover:bg-gray-50 dark:hover:bg-gray-950'>
                                                    <td className="px-2 pl-8">
                                                        <img className="object-cover w-10 h-10 rounded-lg" src={user.image} alt="" />
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{user.name}</td>
                                                    <td className="px-2 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-x-1 dark:bg-gray-800">
                                                            <span className={`h-1.5 w-1.5 rounded-full ${user.status === 'active' ? "bg-emerald-500" : "bg-Red"}`}></span>
                                                            <h2 className={`text-sm font-normal ${user.status === 'active' ? "text-emerald-500" : "text-Red"}`}>{user.status}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-4 text-sm  text-gray-500 dark:text-gray-300 whitespace-nowrap">{user.role}</td>
                                                    <td className="px-2 py-4 text-sm  text-gray-500 dark:text-gray-300 whitespace-nowrap">{user.email}</td>
                                                    <td className="px-2 py-4 text-sm flex justify-center whitespace-nowrap">
                                                        <div className="flex items-center gap-x-6">
                                                            {
                                                                user.status === 'active' ? (<button
                                                                    onClick={() => handleBlock(`${user._id}`)}
                                                                    disabled={user.role === 'admin'}
                                                                    className={`text-xs font-semibold bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1 ${user.role === 'admin' && 'cursor-not-allowed opacity-40'}`}>Block</button>
                                                                ) : (<button
                                                                    onClick={() => handleActive(`${user._id}`)}
                                                                    disabled={user.role === 'admin'}
                                                                    className={`text-xs font-semibold bg-green-500 hover:bg-green-600 text-white rounded-md px-2 py-1 ${user.role === 'admin' && 'cursor-not-allowed opacity-40'}`}>Active</button>)
                                                            }
                                                            <button
                                                                onClick={() => handleMakeAdmin(`${user._id}`)}
                                                                disabled={user.role === 'admin'}
                                                                className={`text-xs font-semibold bg-yellow-500 hover:bg-yellow-600 text-white rounded-md px-2 py-1 ${user.role === 'admin' && 'cursor-not-allowed opacity-40'}`}>Make Admin</button>
                                                            <button
                                                                onClick={() => handleMakeVolunteer(`${user._id}`)}
                                                                disabled={user.role === 'admin'}
                                                                className={`text-xs font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-md px-2 py-1 ${user.role === 'admin' && 'cursor-not-allowed opacity-40'}`}>Make Volunteer</button>
                                                        </div>
                                                    </td>
                                                </tr>)
                                        }

                                        {/* Add more rows as needed */}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex items-center md:justify-center justify-between md:gap-7 mt-6 px-3">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className={`flex items-center px-5 py-2 text-sm text-white capitalize transition-colors duration-200 bg-Red border rounded-md gap-x-2 hover:bg-red-600 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>
                                <span>Previous</span>
                            </button>

                            <div className="items-center lg:flex gap-x-3">
                                {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, index) => index + 1).map((page) => (
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
                                disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(users.length / itemsPerPage)))}
                                className={`flex items-center px-5 py-2 text-sm text-white capitalize transition-colors duration-200 bg-Red border rounded-md gap-x-2 ${currentPage === Math.ceil(users.length / itemsPerPage) ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                <span>Next</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </div>
                    </>
                }

            </section>
            <ThemeToggleButton />
        </div>
    );
};

export default AllUsers;