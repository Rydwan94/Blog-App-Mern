/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleTheme } from "../features/theme/themeSlice";
import { signoutSucces } from "../features/user/userSlice";

const Header = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

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

  return (
    <>
      <Navbar className="border-b-2">
        <Link
          className="whitespace-nowrap text-sm font-semibold dark:text-white sm:text-xl"
          to="/"
        >
          <span className="rounded-lg bg-gradient-to-r from-pink-400 via-orange-600 to-rose-700 px-2 py-1 text-white">
            Take
          </span>
          Blog
        </Link>
        <form>
          <TextInput
            type="text"
            placeholder="szukaj..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            style={{ paddingRight: "0px" }}
          />
        </form>
        <Button className="h-10 w-12 lg:hidden" color="gray" pill>
          <AiOutlineSearch className="self-center " />
        </Button>
        <div className="flex items-center gap-x-2 md:order-2">
          <Button
            className="hidden h-10 w-12 sm:inline"
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
          <Navbar.Link active={pathName === "/"} as={"div"}>
            <Link to="/">Strona główna</Link>
          </Navbar.Link>
          <Navbar.Link active={pathName === "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </Navbar.Link>
          <Navbar.Link active={pathName === "/projects"} as={"div"}>
            <Link to="/projects">Projekty</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
