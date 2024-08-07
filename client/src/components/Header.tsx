/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Navbar,
  TextInput,
} from "flowbite-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleTheme } from "../features/theme/themeSlice";
import { signoutSucces } from "../features/user/userSlice";
import { useEffect, useState } from "react";

const Header = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { theme } = useAppSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFormMobile, setShowFormMobile] = useState(false);

  const dispatch = useAppDispatch();
  // const pathName = useLocation().pathname;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleChangeTheme = () => {
    dispatch(toggleTheme());
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("api/user/signout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSucces());
        navigate("/");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    setShowFormMobile(false)
    navigate(`/search?${searchQuery}`);
  };

  return (
    <>
      <Navbar>
        <Link
          className="whitespace-nowrap text-sm font-semibold dark:text-white sm:text-xl"
          to="/"
        >
          <span className="rounded-lg bg-gradient-to-r from-pink-400 via-orange-600 to-rose-700 px-2 py-1 text-white">
            eCommWizard
          </span>
          Blog
        </Link>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="szukaj..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </form>
        <Button
          onClick={() => setShowFormMobile(!showFormMobile)}
          className="h-10 w-12 lg:hidden"
          color="gray"
          pill
        >
          <AiOutlineSearch className="self-center " />
        </Button>

        {showFormMobile && (
          <Drawer
            open={showFormMobile}
            onClose={() => setShowFormMobile(false)}
            position="top"
            className="animate-fade-down"
            
          >
            <Drawer.Header title="Wyszukiwarka"  />
            <Drawer.Items>
              <form className="flex flex-col w-[90%] mx-auto items-center justify-center " onSubmit={handleSubmit}>
                <h3 className="text-xl mb-5">Wyszukaj artykuł</h3>
                <input type="text" className="dark:bg-slate-600 w-full bg-slate-100 rounded-xl border-none shadow-md"/>
                <Button className="mt-5 w-full" type="submit" gradientDuoTone="pinkToOrange">Szukaj</Button>
              </form>
            </Drawer.Items>
          </Drawer>
        )}
        <div className="flex items-center gap-x-2 md:order-2">
          <Button
            className="inline h-10 w-12"
            color="gray"
            pill
            onClick={handleChangeTheme}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </Button>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block truncate text-sm font-medium">
                  @{currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item className="px-0">
                  {" "}
                  <span className="pl-2">Profil</span>
                </Dropdown.Item>
              </Link>
              <Dropdown.Divider />

              <Dropdown.Item onClick={handleSignout} className="px-0">
                <span className="pl-2">Wyloguj się</span>
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button gradientDuoTone="pinkToOrange" pill>
                Zaloguj się
              </Button>
            </Link>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link
            className="transition-all hover:scale-105 hover:!text-black dark:hover:!text-white"
            as={"div"}
          >
            <NavLink className="font-semibold" to="/">
              Strona główna
            </NavLink>
          </Navbar.Link>
          <Navbar.Link
            className="transition-all hover:scale-105 hover:!text-black dark:hover:!text-white"
            as={"div"}
          >
            <NavLink className="font-semibold" to="/about">
              Nowości
            </NavLink>
          </Navbar.Link>
          <Navbar.Link
            className="transition-all hover:scale-105 hover:!text-black dark:hover:!text-white"
            as={"div"}
          >
            <NavLink className="font-semibold" to="/search">
              Artykuły
            </NavLink>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
