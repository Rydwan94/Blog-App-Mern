import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PostCard from "../components/PostCard";
import { Button } from "flowbite-react";

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
  const navigate = useNavigate();

  const dataHome = [
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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("api/post/getposts?limit=6");
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, []);

  return (
    <div className="w-full">
      <div className="flex h-[600px] w-full flex-col items-start justify-center rounded-lg bg-[url('./assets/image/homeImage.png')] bg-cover bg-center bg-no-repeat shadow-2xl">
        <div className="min-w-screen max-w-fit px-5 sm:ml-20 sm:max-w-[700px] sm:px-0">
          <p className="mb-5 text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
            est.
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
            ipsam facilis quod aspernatur
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

      <div className="mx-auto mt-32 max-w-7xl">
        {dataHome.map((item) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            key={item.id}
            className="group mx-5 lg:mx-0 "
          >
            <div className="mb-5 flex items-center justify-between">
              <h4 className="text-xl font-extrabold">
                {item.posts.length > 0 && item.posts[0].category}
              </h4>
              <span className="text-sm text-gray-400 transition-all hover:scale-105">
                <Link
                  to={`/search?searchTerm=${item.posts.length > 0 ? item.posts[0].category : ""}`}
                >
                  Zobacz wszystkie
                </Link>
              </span>
            </div>
            <div className="mb-40 flex w-full flex-col items-center lg:flex-row">
              <div className="relative basis-1/2 overflow-hidden rounded-xl">
                {item.posts.length > 0 && (
                  <Link
                    to={`/search?searchTerm=${item.posts.map((i) => i.slug)}`}
                  >
                    <img
                      className="group-hover: w-full aspect-video object-cover transition-all group-hover:scale-125"
                      src={item.posts[0].image}
                      alt={item.posts[0].title}
                    />
                  </Link>
                )}
              </div>
              <div className="ml-0 flex self-stretch h-[170px] bg-black  basis-1/2 flex-wrap gap-3 lg:ml-5">
                {item.categoryInfoCards.map((infoCard, index) => (
                  <div
                    key={index}
                    className="flex h-full min-h-[135px] w-full flex-auto flex-col justify-center rounded-xl p-5 shadow-lg last:w-full dark:bg-slate-800 sm:w-[49%] sm:last:text-center"
                  >
                    <h5 className="mb-2 text-xs font-semibold uppercase text-slate-400">
                      {infoCard.category}
                    </h5>
                    <p className="font-bold">{infoCard.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mx-auto mb-20 max-w-[90%]"
      >
        <div>
          <h4 className="mb-10 border-b border-b-slate-200 py-10 text-xl font-bold">
            Ostatnie posty
          </h4>
          <div className="flex min-w-full flex-wrap justify-center gap-20 xl:flex-nowrap ">
            {posts.map((post) => (
              <PostCard {...post} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
