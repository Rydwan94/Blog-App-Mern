import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PostCard from "../components/PostCard";
import { Button } from "flowbite-react";
import { HomeInfoCard } from "../components/HomeInfoCard";
import CategoryCard from "../components/CategoryCard";
import { HiArrowRight } from "react-icons/hi";
import { categoryCardData, dataHome } from "../constants/constants";

interface Post {
  _id?: string;
  image: string;
  slug: string;
  category: string;
  createdAt: Date;
  title: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>(posts);

  const [cardIndex, setCardInex] = useState(0);

  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/post/getposts");
      const data = await res.json();

      if (res.ok) {
        setPosts(data.posts);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchRecentPosts = async () => {
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

    fetchRecentPosts();
  }, []);

  const handleChangeCard = () => {
    if (cardIndex < categoryCardData.length - 1) {
      setCardInex((prev) => (prev += 1));
    } else setCardInex(0);
  };

  return (
    <div className="w-full">
      <div className="flex h-[600px] w-full flex-col items-start justify-center rounded-lg bg-[url('./assets/image/homeImage.png')] bg-cover bg-center bg-no-repeat shadow-2xl">
        <div className="min-w-screen max-w-fit px-5 sm:ml-20 sm:max-w-[700px] sm:px-0">
          <p className="mb-5 text-white hidden sm:block">
            Dropshipping to model biznesowy, który pozwala na sprzedaż produktów
            bez potrzeby posiadania ich w magazynie. Zamiast tego, sprzedawca
            współpracuje z dostawcą, który bezpośrednio wysyła produkty do
            klienta.
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Odkryj tajniki dropshippingu: Jak zacząć i odnieść sukces w
            e-commerce
          </h2>
          <Button
            onClick={() => navigate("/search")}
            className="mt-10 transition-all hover:scale-105"
            gradientDuoTone="pinkToOrange"
          >
            Zobacz Artykuły
          </Button>
        </div>
      </div>

      <div>
        {dataHome.map((item) => (
          <HomeInfoCard key={item.id} homeData={item} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className=" mx-auto flex max-w-3xl px-5 sm:px-0"
      >
        <div className="relative flex snap-x flex-row gap-x-9 overflow-x-scroll rounded-md scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 sm:scrollbar-none">
          {categoryCardData.map((item) => (
            <CategoryCard
              key={item.id}
              {...item}
              index={cardIndex}
              setCardIndex={setCardInex}
            />
          ))}
        </div>

        <button
          className="ml-3 hidden min-h-full rounded-md shadow-md dark:bg-slate-700 sm:block sm:px-10 "
          onClick={handleChangeCard}
        >
          <HiArrowRight className="text-2xl" />
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mx-auto mb-20 max-w-[90%]"
      >
        <h4 className="mb-10 border-b border-b-slate-200 py-10 text-xl font-bold">
          Ostatnie posty
        </h4>
        <div className="flex min-w-full flex-wrap justify-center gap-20 xl:flex-nowrap">
          {recentPosts.map((post) => (
            <PostCard key={post._id} {...post} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
