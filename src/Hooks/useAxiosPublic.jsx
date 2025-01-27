import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://donora-backend-sigma.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;