import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useGetRole from "../Hooks/useGetRole";
import Spinner from "../Components/Spinner";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [userRole, isLoading] = useGetRole();
    const location = useLocation();

    if (loading || isLoading) {
        return <Spinner/>
    }

    if (user && userRole === 'admin') {
        return children;
    }

    return <Navigate to="/" state={{ from: location.pathname }} replace></Navigate>

};

export default AdminRoute;