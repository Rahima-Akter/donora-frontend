import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useGetRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: role = {}, isLoading } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
            const response = await axiosSecure(`/single-user/${user?.email}`);
            return response.data;
        }
    });
    const userRole = role?.role;
    return [userRole, isLoading];
};

export default useGetRole;