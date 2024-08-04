import { Badge } from "flowbite-react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface SearchedBlogCardProps {
  _id?: string;
  image: string;
  category: string;
  content: string;
  createdAt: Date;
  slug: string;
  title: string;
}

const SearchedBlogCard = ({
  image,
  category,
  content,
  createdAt,
  slug,
  title,
}: SearchedBlogCardProps) => {
  const getColorForCategory = (category: string) => {
    if (category === "produkty") return "failure";
    if (category === "dostawy") return "warning";
    if (category === "płatności") return "indigo";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
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
            <h2 className="my-5 line-clamp-1  text-center text-xl font-bold uppercase">
              {title}
            </h2>
            <p className="mt-5 line-clamp-1 text-sm">
              {content.replace(/<\/?[^>]+(>|$)/g, "")}
            </p>
            <div className="mt-10 flex items-center gap-x-3">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src="https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/354256747_6521591171234148_6535881735557664027_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=y89HcWWQC6gQ7kNvgEpk2Q5&_nc_ht=scontent-waw2-1.xx&gid=AUtEYaOD4uTCoMVR1bo4SPC&oh=00_AYDvuY5NgS2sVmVI3XsdBAFyqQZZQFh73LGHbziJCx2Whw&oe=66B1C29D"
                alt={`Author picture`}
                loading="lazy"
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-slate-400">
                  Łukasz Rydwański
                </p>
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
