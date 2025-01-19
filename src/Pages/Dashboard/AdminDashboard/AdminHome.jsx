import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Spinner from '../../../Components/Spinner';
import HandleStatus from '../../../Hooks/HandleStatus';

const AdminHome = () => {
    const { user } = useAuth();
    const [handleStatus, status] = HandleStatus();
    const axiosSecure = useAxiosSecure();
    const { data: users = {}, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/get-all-users`)
            return data;
        }
    });

    const handleBlock = (id) => {
        handleStatus(id, 'block', '/user-status')
        refetch();
    }
    const handleActive = (id) => {
        handleStatus(id, 'active', '/user-status')
        refetch();
    }

    if (isLoading) return <Spinner />
    return (
        <div className='p-5 bg-red-50 h-screen'>
            {
                user ? user && <p className='font-bold text-xl text-green-600'>🩸Welcome, <span className='text-Red uppercase'>{user?.displayName}</span></p> : <p className='font-bold text-xl'>Welcome....</p>
            }
            <section className='pt-10 w-[90%]'>
                <div className='flex justify-between items-center mb-1'>
                    <p className='font-semibold uppercase text-Red text-sm mb-4'>All Registered users</p>
                    {/* button group for filter */}
                    <div className="join mb-2">
                        <select
                            // onChange={(e) => setStatus(e.target.value)}
                            className="select select-bordered join-item bg-Red rounded-lg border border-white pb-1 px-2 text-white font-bold">
                            <option className='font-bold' value=''>Filter by</option>
                            <option className='font-bold' value='pending'>pending</option>
                            <option className='font-bold' value='inprogress'>inprogress</option>
                            <option className='font-bold' value='done'>done</option>
                            <option className='font-bold' value='canceled'>canceled</option>
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
                                {/* Example Row */}
                                {
                                    users.map(user => <tr key={user._id} className='hover:bg-gray-50'>
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
                                                    // onClick={() => handleCancel(`${user._id}`)} 
                                                    disabled={user.role === 'admin'}
                                                    className={`text-xs font-semibold bg-yellow-500 hover:bg-yellow-600 text-white rounded-md px-2 py-1 ${user.role === 'admin' && 'cursor-not-allowed opacity-40'}`}>Make Admin</button>
                                                <button
                                                    // onClick={() => handleCancel(`${user._id}`)} 
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

                {/* Pagination Section */}
                <div className="flex items-center justify-between mt-6">
                    <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                        <MdOutlineKeyboardArrowLeft className="w-5 h-5 rtl:-scale-x-100" />
                        <span>previous</span>
                    </a>

                    <div className="items-center hidden lg:flex gap-x-3">
                        <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
                    </div>

                    <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                        <span>Next</span>
                        <MdOutlineKeyboardArrowRight className="w-5 h-5 rtl:-scale-x-100" />
                    </a>
                </div>
            </section>
        </div>
    );
};

export default AdminHome;