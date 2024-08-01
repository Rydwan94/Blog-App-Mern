

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
    <figure className="group w-[350px] snap-center overflow-hidden rounded-md border border-slate-200 dark:border-slate-700 dark:bg-slate-800 sm:w-full">
      <img
        className="aspect-square h-96 w-full object-cover transition-all group-hover:scale-105"
        src={image}
        alt={slug}
      />
      <figcaption className="p-8">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p className="flex items-center gap-x-2 text-sm uppercase text-gray-400">
            Artykuł z kategorii{" "}
            <span className="text-xs font-semibold text-slate-500 underline dark:text-white">
              {category}
            </span>
          </p>
          <p className="flex items-center gap-x-2 text-sm uppercase text-gray-400">
            Data utworzenia artykułu{" "}
            <span className="text-xs font-semibold text-slate-500 underline dark:text-white">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>
        <div className="mt-10 flex items-center justify-between">
          <h2 className=" text-2xl sm:text-4xl">{title}</h2>
          <div className="flex flex-col items-center">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/354256747_6521591171234148_6535881735557664027_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=y89HcWWQC6gQ7kNvgEpk2Q5&_nc_ht=scontent-waw2-1.xx&gid=AUtEYaOD4uTCoMVR1bo4SPC&oh=00_AYDvuY5NgS2sVmVI3XsdBAFyqQZZQFh73LGHbziJCx2Whw&oe=66B1C29D"
              alt="profile picture"
            />
            <p className="mt-2 ">Łukasz Rydwański</p>
          </div>
        </div>
      </figcaption>
    </figure>
  );
};

export default AboutPostCard;
