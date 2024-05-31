import { useAppSelector } from "../app/hooks";
import { Navigate, Outlet } from "react-router";

const OnlyAdminPrivateRoute = () => {
    const {currentUser} = useAppSelector(state => state.user)

  return currentUser.isAdmin ? <Outlet/> : <Navigate to='/sign-in' /> 
};

export default OnlyAdminPrivateRoute;
