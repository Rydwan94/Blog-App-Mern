import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import { useLocation } from "react-router";
import { useAppDispatch } from "../app/hooks";
import { signoutSucces } from "../features/user/userSlice";

const DashSidebar = () => {
  const dispatch = useAppDispatch()
  const location = useLocation();
  const [tab, setTab] = useState<string | null>("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location]);
  
  console.log(tab)

  const handleSignout = async() => {
    try {
      const res = await fetch('/api/user/signout', {
        method: "POST"
      })

      const data = await res.json()
      if(!res.ok){
        console.log(data.message)
      }else dispatch(signoutSucces())
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.log(error.message)
    }
  }

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup >
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
              labelColor="dark"
              as="div"
            >
              Profil
            </Sidebar.Item>
          </Link>
          <Sidebar.Item
            onClick={handleSignout}
            className="cursor-pointer"
            icon={LuLogOut}
            labelColor="dark"
          >
            Wyloguj się
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
