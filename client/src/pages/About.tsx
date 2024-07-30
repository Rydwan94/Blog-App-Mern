import { Pagination, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ProfileCard from "../components/ProfileCard";
import RecentPostsAboutCard from "../components/RecentPostsAboutCard";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SecondCallToAction from "../components/SecondCallToAction";
import AboutPostCard from "../components/AboutPostCard";
import { GiBookshelf } from "react-icons/gi";

interface Post {
  _id?: string;
  image: string;
  slug: string;
  category: string;
  createdAt: Date;
  title: string;
  content: string;
  numberOfLikes: string;
}

const About = () => {
  const [searchValue, setSearchValue] = useState("");
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [mostOfLikesPost, setMostOfLikesPost] = useState<Post[]>([]);
  const [searchedPosts, setSearchedPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 4;

  const navigate = useNavigate();

  const socialIcons = [
    {
      id: 0,
      icon: <FaFacebook />,
      path: "https://www.facebook.com/profile.php?id=100001499895361",
    },
    {
      id: 1,
      icon: <FaLinkedin />,
      path: "https://www.linkedin.com/in/%C5%82ukasz-rydwa%C5%84ski-237469173/",
    },
    {
      id: 2,
      icon: <FaGithub />,
      path: "https://www.facebook.com/profile.php?id=100001499895361",
    },
  ];

  useEffect(() => {
    const handleFetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts");
        const data = await res.json();

        if (res.ok) {
          setRecentPosts(data.posts);
          setMostOfLikesPost(
            data.posts.sort(
              (a: { numberOfLikes: number }, b: { numberOfLikes: number }) =>
                b.numberOfLikes - a.numberOfLikes,
            ),
          );
          setTotalPages(Math.ceil(data.posts.length / postsPerPage));
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    handleFetchPosts();
  }, []);

  useEffect(() => {
    if (recentPosts) {
      setSearchedPosts(
        recentPosts.filter(
          (post) =>
            post.content.toLowerCase().includes(searchValue.toLowerCase()) ||
            post.slug.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      );
    }
  }, [searchValue, recentPosts]);

  const onPageChange = (page: number) => setCurrentPage(page);

  const handleOnSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?searchTerm=${searchValue}`);
  };

  

  const paginatedPosts = recentPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  return (
    <div className="mx-auto my-20 flex min-h-screen max-w-7xl flex-col gap-x-2 p-2 sm:flex-row">
      <div className="flex basis-2/3 flex-col gap-10 overflow-hidden">
        <ProfileCard />
        <div className="mb-10 flex w-full snap-x flex-row gap-10 overflow-y-hidden overflow-x-scroll scroll-smooth  scrollbar-track-slate-100 scrollbar-thumb-slate-300  dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 sm:flex-col sm:scrollbar-none">
          {paginatedPosts &&
            paginatedPosts.map((post) => (
              <Link key={post._id} to={`/post/${post.slug}`}>
                <AboutPostCard key={post._id} {...post} />
              </Link>
            ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      </div>
      <div className="basis-1/3">
        <div className="relative flex flex-col gap-5 overflow-y-scroll max-h-96 rounded-md p-5 shadow-md dark:bg-slate-800">
          <form className="sticky z-10 top-0" onSubmit={handleOnSubmit}>
            <TextInput
              className=""
              type="text"
              placeholder="szukaj..."
              rightIcon={AiOutlineSearch}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchValue(e.target.value)
              }
            />
          </form>
          <h3 className="text-center font-bold uppercase">Znajdź Artykuł</h3>
          {searchedPosts.length ? (
            searchedPosts.map((post) => (
              <RecentPostsAboutCard key={post._id} {...post} />
            ))
          ) : (
            <p className="flex animate-flip-down items-center justify-center gap-x-3  text-center text-slate-500">
              Nie ma takiego artykułu{" "}
              <span>
                <GiBookshelf className="text-3xl" />
              </span>
            </p>
          )}
        </div>
        <div className="mt-5 rounded-md p-5 shadow-md dark:bg-slate-800">
          <h3 className="text-center font-bold uppercase">Social Media</h3>
          <div className="mt-10 flex items-center justify-center gap-x-4">
            {socialIcons.map((item) => (
              <Link
                className="text-3xl text-orange-500 transition-all hover:scale-110"
                key={item.id}
                to={`${item.path}`}
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-md shadow-md transition-all hover:shadow-xl">
          <SecondCallToAction mostOfLikesPost={mostOfLikesPost} />
        </div>
      </div>
    </div>
  );
};

export default About;
