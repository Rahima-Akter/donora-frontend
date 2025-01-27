import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Spinner from '../../Components/Spinner';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet-async';

const DonationRequests = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { data: pendingRequests = [], isLoading } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/all-blood-requests')
            return data;
        }
    });
    const requests = pendingRequests.filter(req => req.status === 'pending')

    if (isLoading) return <Spinner />

    return (
        <div className='md:mt-[130px] my-[65px] w-11/12 mx-auto'>
            <Helmet>
                <title>DONORA || donation requests</title>
            </Helmet>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    requests.length === 0 ?
                        <div className='col-span-4'>
                            <img src="https://media1.tenor.com/m/YvOjHMyFlH0AAAAd/empty-box.gif" alt="" className='lg:w-[60%] lg:h-[80%] mx-auto lg:mt-0 mt-12' />
                            <p className='font-bold drop-shadow-lg uppercase text-Red text-xl my-4 text-center'>No data to show</p>
                        </div>
                        : requests.map(request => (
                            <div key={request._id} className="flex flex-col max-w-sm overflow-hidden bg-red-50 rounded-lg shadow-lg dark:bg-gray-800">
                                <div className="p-4 md:py-4 md:px-5 w-full flex flex-col flex-grow">
                                    <h1 className="text-xl font-bold text-Red">{request.recipientName} ({request.bloodGroup})</h1>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                        {request.hospital}, {request.fullAddress}
                                    </p>

                                    <div className="flex mt-2 items-center mb-2">
                                        {format(new Date(`1970-01-01T${request.donationTime}:00Z`), "hh:mm a")}, {format(new Date(request.donationDate), 'P')}
                                    </div>

                                    {/*  */}
                                    <div className="flex items-center mt-auto">
                                        <h1 className="text-xs font-bold text-Red md:text-sm">{request.status}....</h1>
                                        <button
                                            onClick={() => navigate(`/dashboard/details/${request._id}`)}
                                            className="ml-auto px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-Red rounded hover:bg-red-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                }
            </div>

        </div>
    );
};

export default DonationRequests;