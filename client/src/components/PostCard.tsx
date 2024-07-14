import { Link } from "react-router-dom";

interface PosctCardProps {
  image: string;
  slug: string;
  category: string;
  createdAt: Date;
  title: string;
}

const PostCard = ({
  image,
  slug,
  category,
  createdAt,
  title,
}: PosctCardProps) => {
  const date = new Date(createdAt);
  return (
    <figure className="group relative flex max-w-fit  mx-10  flex-col items-center rounded-xl bg-white py-0 shadow-xl dark:bg-gray-800 sm:flex-row sm:py-10">
      <Link to={`/post/${slug}`}>
        <div className="custom-container ml-0 transition-all group-hover:animate-pulse sm:-ml-14">
          <img
            className=" aspect-square rounded-xl object-cover opacity-80 shadow-lg duration-300 group-hover:shadow-orange-400 sm:min-w-44 sm:max-w-44"
            src={image}
            alt={slug}
          />
        </div>
      </Link>
      <figcaption className="mt-10 flex flex-col items-center gap-y-5 overflow-hidden px-10 sm:mt-0">
        <p className="text-nowrap text-xs font-semibold text-slate-400 dark:text-white">
          Data utworzenia {date.toISOString().slice(0, 10)}
        </p>
        <span className="text-sm italic text-slate-400 dark:text-white">
          {category}
        </span>
        <h1 className="line-clamp-2 text-lg font-semibold text-black dark:text-white">
          {title}
        </h1>
        <Link
          to={`/post/${slug}`}
          className="mb-5 sm:translate-y-44 rounded-xl bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 p-2 font-semibold  text-white transition-all duration-300 group-hover:translate-y-0 sm:mb-0 "
        >
          Przeczytaj
        </Link>
      </figcaption>
    </figure>
  );
};

export default PostCard;
