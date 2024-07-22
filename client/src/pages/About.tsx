import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Post {
  _id?: string;
  image: string;
  slug: string;
  category: string;
  createdAt: Date;
  title: string;
  content: string;
}

function About() {
  const [searchValue, setSearchValue] = useState("");
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);

  console.log(recentPosts);
  useEffect(() => {
    const handleFetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=3");
        const data = await res.json();

        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleFetchPosts();
  }, []);
  return (
    <div className="mx-auto mt-20 flex h-screen max-w-7xl flex-col gap-x-5 sm:flex-row ">
      <div className="basis-2/3">
        <div className=" flex flex-col items-center justify-center p-10 shadow-xl  dark:bg-slate-800">
          <img
            src="https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-1/354256747_6521591171234148_6535881735557664027_n.jpg?stp=dst-jpg_p200x200&_nc_cat=105&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=FZaiwIwCy_cQ7kNvgFB4qRF&_nc_ht=scontent-waw2-1.xx&oh=00_AYBLFIfxoslmw-2SwR96XIe8OC-Wjd-sjNFeGaZzcKG7Dw&oe=66A318DF"
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
        </div>
      </div>
      <div className="basis-1/3 ">
        <form>
          <TextInput
            className="shadow-xl"
            type="text"
            placeholder="szukaj..."
            rightIcon={AiOutlineSearch}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
          />
        </form>

        <div className="mt-5 flex flex-col gap-5 p-5 shadow-xl dark:bg-slate-800">
          <h3 className="text-center font-bold uppercase">Ostatnie Posty</h3>
          {recentPosts &&
            recentPosts.map((post) => (
              <div
                key={post._id}
                className="flex items-center border-b border-slate-300 p-2 transition-all hover:shadow-xl"
              >
                <img
                  className="h-20 w-20 rounded-xl object-cover"
                  src={post.image}
                  alt={post.slug}
                />
                <div className="flex w-full flex-col items-center justify-center">
                  <p className="text-gray-400 uppercase mb-2 font-semibold">{post.title}</p>
                  <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default About;
