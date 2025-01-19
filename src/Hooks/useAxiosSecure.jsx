import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    useEffect(() => {
        // authorization header for every secure call from the server
        axiosSecure.interceptors.request.use(function (config) {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        // interceptor for 401 and 403 status
        axiosSecure.interceptors.response.use(
            res => {
                return res;
            },
            async error => {
                if (error.response.status === 401 || error.response.status === 403) {
                    // logout
                    logOut();
                    // navigate to login
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );
    }, [logOut, navigate])

    return axiosSecure;
}

export default useAxiosSecure;
