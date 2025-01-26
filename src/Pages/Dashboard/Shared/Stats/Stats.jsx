import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../../Components/Spinner';
import { FaRegHeart } from 'react-icons/fa';
import { GiDroplets } from 'react-icons/gi';
import { RiRefund2Fill } from 'react-icons/ri';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const colors = [
    '#1f77b4', '#FF0000', '#2ca02c', '#d62728', '#9467bd',
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
];


const Stats = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats, isLoading } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('stats');
            return data;
        }
    });

    const sampleData = stats ? [
        { name: "Users", uv: stats.users },
        { name: "Requests", uv: stats.requests },
        { name: "Funds", uv: stats.totalDonations },
    ] : [];

    if (isLoading) return <Spinner />;

    return (
        <div className='h-full min-h-full'>
            <div className="stats shadow w-full md:mt-7 mt-4 flex md:flex-row flex-col">
                <div className="stat">
                    <div className="stat-figure text-Red">
                        <FaRegHeart className="text-4xl" />
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value text-Red">{stats.users}</div>
                    <div className="stat-desc">Ready to save lives</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-Red">
                        <GiDroplets className="text-5xl md:-ml-5 lg:-ml-0 " />
                    </div>
                    <div className="stat-title">Total Donation Requests</div>
                    <div className="stat-value text-Red">{stats.requests}</div>
                    <div className="stat-desc">Saving lives every day</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-Red md:-ml-5 lg:-ml-0">
                        <RiRefund2Fill className="text-5xl" />
                    </div>
                    <div className="stat-title">Total Funds</div>
                    <div className="stat-value text-Red">${stats.totalDonations}</div>
                    <div className="stat-desc text-s">Donating to help people in need</div>
                </div>
            </div>

            <div className='flex md:flex-row flex-col justify-between items-center gap-5'>
                {/* Bar Chart */}
                <div style={{ height: '350px' }} className='mt-16 md:w-[100%] w-[110%]'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={sampleData}
                            // margin={{
                            //     top: 20,
                            //     right: 30,
                            //     left: 20,
                            //     bottom: 5,
                            // }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="uv" fill="#8884d8">
                                {sampleData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>


                {/* calendar */}
                <div className='rounded-md p-2 bg-white mt-10'>
                    <DayPicker mode="uncontrolled" />
                </div>
            </div>
        </div>
    );
};

export default Stats;
