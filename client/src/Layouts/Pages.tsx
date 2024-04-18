import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";

const Pages = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/sign-in" element={<SignIn/>}/>
            <Route path="/sign-up" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/projects" element={<Projects/>}/>
        </Routes>
    </>
  );
};

export default Pages;
