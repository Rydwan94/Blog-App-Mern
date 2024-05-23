import {useAppSelector} from "../app/hooks";
import { Outlet, Navigate } from "react-router";
 const PrivateRoute = () => {
  const {currentUser} = useAppSelector((state) => state.user);

  return (
    <>{currentUser ? <Outlet/> : <Navigate to="/sign-in" />} </>
  );
};

export default PrivateRoute;
