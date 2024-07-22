interface AboutPostCardProps {

    content?:string;
    image: string;
    slug:string;
    title?:string;
    category?:string;
    createdAt?: Date
}

const AboutPostCard = ({image, slug}:AboutPostCardProps) => {
  return (
    <figure className="rounded-md overflow-hidden">
      <img className="w-full h-96 object-cover aspect-square" src={image} alt={slug} />
      <figcaption className="py-4">
        <p className="text-sm text-gray-500 uppercase">Artykuł napisany przez <span className="text-black font-bold">Łukasz Rydwański</span></p>
        <h2>{slug}</h2>
      </figcaption>
    </figure>
  );
};

export default AboutPostCard;
