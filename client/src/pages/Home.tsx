import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PostCard from "../components/PostCard";
import { Button } from "flowbite-react";
import { HomeInfoCard } from "../components/HomeInfoCard";

interface Post {
  _id?: string;
  image: string;
  slug: string;
  category: string;
  createdAt: Date;
  title: string;
}

interface CategoryInfoCard {
  category: string;
  content: string;
}

interface HomeData {
  id: number;
  posts: Post[];
  categoryInfoCards: CategoryInfoCard[];
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  console.log(posts);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/post/getposts?limit=6");
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

  const dataHome: HomeData[] = [
    {
      id: 0,
      posts: posts.filter((post) => post.category === "Produkty"),
      categoryInfoCards: [
        {
          category: "Bestsellery",
          content: "Czym się cechuje produkt z potencjałem",
        },
        {
          category: "Jak znaleźć produkty z potencjałem",
          content: "Znajdz produkt z potencjałem",
        },
        {
          category: "Target",
          content: "Jak znaleźc grupę docelową",
        },
      ],
    },
    {
      id: 1,
      posts: posts.filter((post) => post.category === "Metody dostaw"),
      categoryInfoCards: [
        {
          category: "Różne metody dostaw",
          content: "Poznaj różne metody dostaw i wybierz najlepszą dla siebie",
        },
        {
          category: "Czas dostawy",
          content: "Jak skrócić czas dostawy produktów",
        },
        {
          category: "Koszty dostawy",
          content: "Jak optymalizować koszty dostawy",
        },
      ],
    },
    {
      id: 2,
      posts: posts.filter((post) => post.category === "Płatności"),
      categoryInfoCards: [
        {
          category: "Metody płatności",
          content: "Różne metody płatności dostępne dla klientów",
        },
        {
          category: "Bezpieczeństwo płatności",
          content: "Jak zapewnić bezpieczeństwo transakcji online",
        },
        {
          category: "Optymalizacja płatności",
          content: "Jak zoptymalizować procesy płatności",
        },
      ],
    },
  ];

  return (
    <div className="w-full">
      <div className="flex h-[600px] w-full flex-col items-start justify-center rounded-lg bg-[url('./assets/image/homeImage.png')] bg-cover bg-center bg-no-repeat shadow-2xl">
        <div className="min-w-screen max-w-fit px-5 sm:ml-20 sm:max-w-[700px] sm:px-0">
          <p className="mb-5 text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, est.
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ipsam facilis quod aspernatur
          </h2>
          <Button
            onClick={() => navigate("/projects")}
            className="mt-10 transition-all hover:scale-105"
            gradientDuoTone="pinkToOrange"
          >
            Zobacz Artykuły
          </Button>
        </div>
      </div>

      {dataHome.map((item) => (
        <HomeInfoCard key={item.id} homeData={item} />
      ))}

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
          {posts.map((post) => (
            <PostCard key={post._id} {...post} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
