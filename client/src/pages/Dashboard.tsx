import {useEffect, useState} from "react";
import {useLocation} from "react-router";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import { useAppSelector } from "../app/hooks";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";

const Dashboard = () => {
  const location = useLocation();
  const {currentUser} = useAppSelector(state => state.user)

  const [tab, setTab] = useState<string | null>("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  }, [location]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen mb-8" >
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && currentUser.isAdmin && <DashPosts/>}
      {tab === "users" && currentUser.isAdmin && <DashUsers/>}
      {tab === "comments" && currentUser.isAdmin && <DashComments/>}
    </div>
  );
};

export default Dashboard;
