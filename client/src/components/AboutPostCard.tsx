interface AboutPostCardProps {
  content?: string;
  image: string;
  slug: string;
  title?: string;
  category: string;
  createdAt: Date;
}

const AboutPostCard = ({
  image,
  slug,
  title,
  category,
  createdAt,
}: AboutPostCardProps) => {
  return (
    <figure className="group w-[400px] snap-center overflow-hidden rounded-md border border-slate-200 dark:border-slate-700 dark:bg-slate-800 sm:w-full">
      <img
        className="aspect-square h-96 w-full object-cover transition-all group-hover:scale-105"
        src={image}
        alt={slug}
      />
      <figcaption className="p-8">
        <div className="flex items-center justify-between">
          <p className="text-sm uppercase text-gray-400 flex items-center gap-x-2">
            Artykuł z kategorii{" "}
            <span className="text-xs font-semibold text-slate-500 underline dark:text-white">
              {category}
            </span>
          </p>
          <p className="text-sm uppercase text-gray-400 flex items-center gap-x-2">
            Data utworzenia artykułu{" "}
            <span className="text-xs font-semibold text-slate-500 underline dark:text-white">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>
        <h2 className="mt-10 text-2xl sm:text-4xl">{title}</h2>
      </figcaption>
    </figure>
  );
};

export default AboutPostCard;
