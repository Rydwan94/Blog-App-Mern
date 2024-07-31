import { Badge } from "flowbite-react";
import { useAppSelector } from "../app/hooks";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface SearchedBlogCardProps {
  image: string;
  category: string;
  content: string;
  createdAt: Date;
  slug: string;
}

const SearchedBlogCard = ({
  image,
  category,
  content,
  createdAt,
  slug,
}: SearchedBlogCardProps) => {
  const { currentUser } = useAppSelector((state) => state.user);

  const getColorForCategory = (category: string) => {
    if (category === "produkty") return "failure";
    if (category === "dostawy") return "warning";
    if (category === "płatności") return "indigo";
  };

  return (
    <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        >
    <Link to={`/post/${slug}`} aria-label={`Read more about ${category}`}>
      <figure className="group h-fit w-80 overflow-hidden rounded-lg shadow-xl transition-all hover:shadow-2xl">
        <img
          className="aspect-video w-full object-cover transition-all group-hover:scale-110"
          src={image}
          alt={`${category} image`}
          loading="lazy"
        />
        <figcaption className="p-6 dark:bg-slate-800">
          <Badge className="max-w-fit" color={getColorForCategory(category)}>
            {category}
          </Badge>
          <h2 className="text-center text-xl  my-5 uppercase">{slug}</h2>
          <p className="mt-5 line-clamp-1 text-sm">
            {content.replace(/<\/?[^>]+(>|$)/g, "")}
          </p>
          <div className="mt-10 flex items-center gap-x-3">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={currentUser.profilePicture}
              alt={`${currentUser.username}'s profile`}
              loading="lazy"
            />
            <div className="flex flex-col">
              <p className="text-sm text-slate-400 font-semibold">{currentUser.username}</p>
              <p className="text-sm text-slate-400">
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </figcaption>
      </figure>
    </Link>
    </motion.div>
  );
};

export default SearchedBlogCard;
