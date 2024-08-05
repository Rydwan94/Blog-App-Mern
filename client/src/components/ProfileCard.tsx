import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import myselfPicture from '../assets/image/myselfPicture.jpg'

const ProfileCard = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}className=" flex flex-col items-center justify-center p-10 shadow-md  dark:bg-slate-800">
        <img
          src={myselfPicture}
          alt=""
          className="h-28 w-28 rounded-full object-cover"
        />
        <h1 className="mt-2 text-xl  ">Łukasz Rydwański</h1>
        <p className="mt-2 text-center text-sm font-semibold text-gray-500">
          Witamy na mojej stronie! Jestem Łukasz Rydwański,
          <br /> pasjonat technologii i programowania.
        </p>
        <div className="mt-10 flex items-center gap-5">
          <Link
            className="text-3xl text-gray-500 transition-all hover:scale-105"
            to="https://github.com/Rydwan94?tab=repositories"
          >
            <FaGithub />
          </Link>
          <Link
            className="text-3xl text-gray-500 transition-all hover:scale-105"
            to="https://www.facebook.com/profile.php?id=100001499895361"
          >
            <FaFacebook />
          </Link>
          <Link
            className="text-3xl text-gray-500 transition-all hover:scale-105"
            to="https://www.linkedin.com/in/%C5%82ukasz-rydwa%C5%84ski-237469173/"
          >
            <FaLinkedin />
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default ProfileCard;
