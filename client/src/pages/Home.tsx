import { Badge, Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";

interface Post {
  _id?:string;
  image: string;
  slug: string;
  category: string;
  createdAt: Date;
  title: string;
}

const Home = () => {
  const [randomPost, setRandomPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("api/post/getposts?limit=6");
        const data = await res.json();

        const randomPost = Number(
          Math.floor(Math.random() * data.posts.length),
        );
        if (res.ok) {
          setRandomPost(data.posts[randomPost]);
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, []);
  return (
    <div className="mx-auto mt-10 min-h-screen sm:max-w-7xl">
      <div className="flex h-[600px] w-full items-end rounded-lg bg-[url('./assets/image/homeImage.png')] bg-cover bg-no-repeat shadow-2xl">
        <Card className="-mb-36 max-w-96 sm:-mb-20 sm:ml-20 mx-5 sm:px-0 ">
          <Badge className="max-w-fit" color="indigo">
            {randomPost?.category}
          </Badge>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {randomPost?.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Ten artykuł został losowo wybrany. Zapraszamy do lektury:{" "}
            {randomPost?.title}. Odkryj więcej w kategorii{" "}
            {randomPost?.category}.
          </p>
          <div className="flex items-center justify-between">
            <Link to={`/post/${randomPost?.slug}`}>
              <Button gradientDuoTone="pinkToOrange">Zobacz artykuł</Button>
            </Link>
            <span className="font-normal italic text-gray-700 dark:text-gray-400">
              {randomPost?.createdAt
                ? new Date(randomPost.createdAt).toLocaleDateString()
                : "Brak daty"}
            </span>
          </div>
        </Card>
      </div>

      <div className="mt-72 mb-20">
           <h4 className="text-3xl text-center border-b pb-5 border-b-slate-300">Ostatnie posty</h4> 
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 mt-20">
            {posts.map((post) => <PostCard key={post._id} {...post} />)}
            </div>
      </div>
    </div>
  );
};

export default Home;
