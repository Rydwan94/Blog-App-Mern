import { Badge, Button } from 'flowbite-react';
import { useNavigate } from 'react-router';

interface Post {
  _id?: string;
  image: string;
  slug: string;
  category: string;
  createdAt: Date;
  title: string;
  content: string;
  numberOfLikes: string;
}

interface MostOfLikesPostProps {
  mostOfLikesPost: Post[]
}

const SecondCallToAction = ({mostOfLikesPost}:MostOfLikesPostProps) => {

  const navigate = useNavigate()

  const handleGoToPost = () => {
    navigate(`/post/${mostOfLikesPost[0]?.slug}`)
  }

  if(!mostOfLikesPost){
    return <div><p>lal</p></div>
  }
  return (
    <figure className='dark:bg-slate-800 shadow-lg max-w-full group '>
      <img src={mostOfLikesPost[0]?.image} alt="" className='w-full object-cover aspect-video group-hover:scale-110 transition-all' />
      <figcaption className='flex flex-col gap-y-4 p-4 text-gray-500'>
        <h2 className='text-center text-xl dark:text-white uppercase'>{mostOfLikesPost[0]?.title}</h2>
        <Badge className=' max-w-fit'>{mostOfLikesPost[0]?.category}</Badge>
        <p className='font-bold'>Zobacz artykuł z największa ilością polubień</p>
        <Button onClick={handleGoToPost} gradientDuoTone='pinkToOrange' className='mt-2 w-full'>Zobacz</Button>
      </figcaption>
    </figure>
  );
};

export default SecondCallToAction;
