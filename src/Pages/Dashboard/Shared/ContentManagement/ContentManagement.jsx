import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Spinner from '../../../../Components/Spinner';
import Swal from 'sweetalert2';
import useGetRole from '../../../../Hooks/useGetRole';
import HandleStatus from '../../../../Hooks/HandleStatus';

const ContentManagement = () => {
    const [filter, setFilter] = useState('draft');
    const [handleStatus, status] = HandleStatus();
    const userRole = useGetRole();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { data: blogs = [], isLoading, refetch } = useQuery({
        queryKey: ['blogs', filter],
        queryFn: async () => {
            const response = await axiosSecure.get(`/all-blog?status=${filter}`)
            return response.data;
        }
    });

    const handleDelete = (id) => {
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
                axiosSecure.delete(`/blog/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "The Blog Has Been Deleted.",
                            icon: "success"
                        });
                        refetch()
                    })
            }
        });
    }

    const handlePublish = (id) => {
        handleStatus(id, 'published', `/blog-status`, refetch);
    }
    const handleUnpublish = (id) => {
        handleStatus(id, 'draft', `/blog-status`, refetch);
    }


    if (isLoading) return <Spinner />
    return (
        <div className='py-8 px-6'>
            <div className='flex justify-between items-center'>
                <div className="join mb-2">
                    <select
                        onChange={(e) => setFilter(e.target.value)}
                        value={filter}
                        className="select select-bordered join-item bg-transparent rounded-lg border border-Red hover:bg-red-50 pb-1 px-2 text-Red font-bold">
                        <option className='font-bold' value=''>Filter by</option>
                        <option className='font-bold' value=''>default</option>
                        <option className='font-bold' value='draft'>draft</option>
                        <option className='font-bold' value='published'>published</option>
                    </select>
                </div>
                {/* button group for filter */}
                <Link to='/dashboard/create-blog'
                    className="px-3 py-2 text-xs font-medium tracking-wide transition-colors duration-300 transform bg-transparent border border-Red text-Red rounded-lg hover:bg-red-50 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 uppercase"
                >
                    create blog
                </Link>
            </div>

            {
                blogs.length === 0 && <p className='font-bold drop-shadow-lg uppercase text-Red text-xl mb-4 text-center'>No data to show</p> || (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5'>
                        {
                            blogs.map(blog => <div key={blog._id} className="w-full md:max-w-[300px] px-6 py-5 mt-5 bg-red-50 rounded-lg shadow-lg dark:bg-gray-800 duration-700 hover:bg-white flex flex-col">

                                <h2 className="mt-3 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">{blog.title.slice(0, 22)}...</h2>

                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">{blog.content.slice(0, 80)}....</p>

                                <div className="flex justify-end mt-4 flex-grow">
                                    <div className="flex items-center gap-x-1">
                                        <button
                                            onClick={() => navigate(`/dashboard/view-blog/${blog._id}`)}
                                            className={`text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-md px-2 py-1`}>View</button>
                                        {
                                            blog.status === 'draft' ? (<button
                                                onClick={() => handlePublish(`${blog._id}`)}
                                                disabled={userRole !== 'admin'}
                                                className={`text-xs font-semibold text-white rounded-md px-2 py-1 ${blog.status === 'draft' && 'bg-green-500 hover:bg-green-600'} 
                                                ${userRole !== 'admin' && 'cursor-not-allowed opacity-60'}`}>publish</button>
                                            ) : (<button
                                                onClick={() => handleUnpublish(`${blog._id}`)}
                                                disabled={userRole !== 'admin'}
                                                className={`text-xs font-semibold text-white rounded-md px-2 py-1 ${blog.status === 'published' && 'bg-yellow-500 hover:bg-yellow-600'}
                                                ${userRole !== 'admin' && 'cursor-not-allowed opacity-60'}`}>Unpublish</button>)
                                        }
                                        <button
                                            onClick={() => handleDelete(`${blog._id}`)}
                                            disabled={userRole !== 'admin'}
                                            className={`text-xs font-semibold bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1 ${userRole !== 'admin' && 'cursor-not-allowed opacity-60'}`}>Delete</button>
                                        <button
                                            onClick={() => navigate(`/dashboard/update-blog/${blog._id}`)}
                                            className={`text-xs font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-md px-2 py-1`}>Edit</button>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                )
            }

        </div>
    );
};

export default ContentManagement;