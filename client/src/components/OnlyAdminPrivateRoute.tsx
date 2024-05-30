import { useAppSelector } from "../app/hooks";
import { Navigate, Outlet } from "react-router";

const OnlyAdminPrivateRoute = () => {
    const {currentUser: {isAdmin}} = useAppSelector(state => state.user)

  return isAdmin ? <Outlet/> : <Navigate to='/sign-in' /> 
};

export default OnlyAdminPrivateRoute;
