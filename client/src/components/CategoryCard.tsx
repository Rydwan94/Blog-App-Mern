import { Link } from "react-router-dom";

interface CategoryCardProps {
  id: number;
  image: string;
  category: string;
  index: number;
  setCardIndex: React.Dispatch<React.SetStateAction<number>>;
}

const CategoryCard = ({
  image,
  category,
  id,
  index,
  setCardIndex,
}: CategoryCardProps) => {
  const handleSetIndex = () => {
    setCardIndex(id);
  };

  console.log(index);
  return (
    <Link to={`/search?SearchTerm=&category=${category}`}>
      <figure
        onClick={handleSetIndex}
        className={` group min-w-64 overflow-hidden rounded-md opacity-80 transition-all hover:opacity-100 ${id === index && "snap-center opacity-100"}`}
      >
        <img
          className="aspect-square w-full object-cover transition-all group-hover:scale-105"
          src={image}
          alt={`${category} image`}
        />
        <figcaption>
          <p
            className={`text-center text-xl font-bold  group-hover:text-indigo-400 sm:text-3xl ${id === index && "text-indigo-400"}`}
          >
            {category}
          </p>
        </figcaption>
      </figure>
    </Link>
  );
};

export default CategoryCard;
