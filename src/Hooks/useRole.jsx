import { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const [role, setRole] = useState('');
    const axiosSecure = useAxiosSecure();
    const handleRole = async (id, newRole) => {
        setRole(newRole)
        const response = await axiosSecure.patch(`/user-role/${id}?role=${newRole}`);
        if (response?.data?.modifiedCount > 0) {
            toast.success(`Role changed to ${newRole}.....`);
        } else {
            toast.error("couldn't change ROLE!");
        }
    }
    return [handleRole, role];
};

export default useRole;