import { Button } from 'flowbite-react';
import advertiseImg from '../assets/image/SecondCallToAction.png'

const SecondCallToAction = () => {
  return (
    <div className='dark:bg-slate-800 shadow-lg'>
      <img src={advertiseImg} alt="" />
      <div className='p-4 text-gray-500'>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore, ea.</p>
        <Button gradientDuoTone='pinkToOrange' className='mt-2 w-full'>Zobacz</Button>
      </div>
    </div>
  );
};

export default SecondCallToAction;
