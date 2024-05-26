import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import { useLocation } from "react-router";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState<string | null>("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location]);
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
