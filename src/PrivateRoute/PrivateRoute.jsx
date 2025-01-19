import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
// import Spinner from "../components/Spinner";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation()

    if (loading) {
        return <div className="w-full py-10 text-6xl flex justify-center items-center">
            {/* <Spinner/> */} Loading..........
            </div>
    }

    if (!user) {
        return <Navigate state={{ from: location.pathname }} to="/login"></Navigate>
    }

    return children;
};


export default PrivateRoute;