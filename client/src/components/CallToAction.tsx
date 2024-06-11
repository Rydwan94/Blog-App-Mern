import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-br-3xl rounded-tl-3xl border border-orange-500 p-3 sm:flex-row text-center  ">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
          aperiam.
        </h2>
        <p className="text-gray-500 my-2">Lorem ipsum dolor sit amet.</p>
        <Button
          className="w-full rounded-br-xl rounded-tl-xl"
          gradientDuoTone="pinkToOrange"
        >
          <a href="#" target="_blank" rel="noopener noreferrer">
            Naucz się
          </a>
        </Button>
      </div>
      <div className="flex-1 p-5 ">
        <img
          src="https://www.salesforce.com/in/blog/wp-content/uploads/sites/9/2023/11/SF_Blog_Image_Ecommerce_Changing_Everything.png"
          alt="e-commerce picture"
        />
      </div>
    </div>
  );
};

export default CallToAction;
