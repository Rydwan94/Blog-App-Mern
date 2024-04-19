import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

const Header = () => {

  const pathName = useLocation().pathname

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
          <Button className="hidden h-10 w-12 sm:inline" color="gray" pill>
            <FaMoon />
          </Button>
          <Link to="/sign-in">
            <Button gradientDuoTone="pinkToOrange" pill>
              Zaloguj się
            </Button>
          </Link>
          <Navbar.Toggle/>
        </div>
          <Navbar.Collapse>
            <Navbar.Link active={pathName === "/"} as={'div'}>
              <Link to="/">Strona główna</Link>
            </Navbar.Link>
            <Navbar.Link active={pathName === "/about"} as={'div'}>
              <Link to="/about">About</Link>
            </Navbar.Link>
            <Navbar.Link active={pathName === "/projects"} as={'div'}>
              <Link to="/projects">Projekty</Link>
            </Navbar.Link>
          </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
