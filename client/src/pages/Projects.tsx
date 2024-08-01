import React from "react";
import CallToAction from "../components/CallToAction";

const Projects = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 p-3">
      <h1 className="text-3xl font-semibold">Projekty</h1>
      <p className="text-md text-gray-500">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam dolores
        magnam voluptatem omnis pariatur! Illum molestias vero deserunt nihil
        fugit.
      </p>
      <CallToAction />
    </div>
  );
};

export default Projects;
