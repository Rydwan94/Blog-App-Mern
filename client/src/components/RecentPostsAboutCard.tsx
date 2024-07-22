
import { Link } from "react-router-dom";

interface RecentPostsProps {
  slug: string;
  image: string;
  title: string;
  createdAt: Date;
}

const RecentPostsAboutCard = ({
  slug,
  image,
  title,
  createdAt,
}: RecentPostsProps) => {
  return (
    <>
      <Link to={`/post/${slug}`}>
        <div className="flex items-center animate-jump-in border-b border-slate-300 p-2 transition-all hover:shadow-xl">
          <img
            className="h-20 w-20 rounded-xl object-cover"
            src={image}
            alt={title}
          />
          <div className="flex w-full flex-col items-center justify-center">
            <p className="mb-2 font-semibold uppercase text-gray-400">
              {title}
            </p>
            <p className="text-xs text-gray-500">{new Date(createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default RecentPostsAboutCard;
