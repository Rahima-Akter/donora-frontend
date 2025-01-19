import { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from './useAxiosSecure';

const HandleStatus = () => {
    const [status, setStatus] = useState('');
    const axiosSecure = useAxiosSecure();
    const handleStatus = async (id, newStatus, endpoint) => {
        setStatus(newStatus)
        const response = await axiosSecure.patch(`${endpoint}/${id}?status=${newStatus}`);
        if (response?.data?.modifiedCount > 0) {
            toast.success(`Status changed to ${newStatus}.....`);
        } else {
            toast.error("couldn't change the status!");
        }
    }
    return [handleStatus, status];
};

export default HandleStatus;