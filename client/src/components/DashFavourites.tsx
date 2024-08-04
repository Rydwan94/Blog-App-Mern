import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { Spinner } from "flowbite-react";
import SearchedBlogCard from "./SearchedBlogCard";

interface Post {
  _id: string;
  image: string;
  slug: string;
  category: string;
  createdAt: Date;
  title: string;
  likes: [string];
  content: string;
}

const DashFavourites = () => {
  const [favouritesArticles, setFavouritesArticles] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAppSelector((state) => state.user);
  console.log(favouritesArticles);

  useEffect(() => {
    const fetchFavouritesPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts");
        const data = await res.json();

        if (res.ok) {
          setLoading(false);
          setFavouritesArticles(
            data.posts.filter((post: { likes: string }) =>
              post.likes.includes(currentUser._id),
            ),
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavouritesPosts();
  }, [currentUser]);

  if (loading) return <Spinner />;
  return (
    <div className="w-full  p-10 ">
      <h1 className="text-center text-2xl mb-10 sm:text-3xl ">Ulubione Artykuły</h1>
      <div className="flex min-h-screen w-full flex-wrap justify-center sm:justify-normal">
        {favouritesArticles ? (
          favouritesArticles.map((post) => (
            <SearchedBlogCard key={post._id} {...post} />
          ))
        ) : (
          <div>Brak ulubionych artkułów</div>
        )}
      </div>
    </div>
  );
};

export default DashFavourites;
