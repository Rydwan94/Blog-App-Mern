import { motion } from "framer-motion";

export const HomeInfoCard = ({ dataHome }) => {
  return (
    <div className="mx-auto mt-32 max-w-7xl">
      {dataHome.map((item) => (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          key={item.id}
          className="group mx-5 lg:mx-0 "
        >
          <div className="mb-5 flex items-center justify-between">
            <h4 className="text-xl font-extrabold">
              {item.posts.length > 0 && item.posts[0].category}
            </h4>
            <span className="text-sm text-gray-400 transition-all hover:scale-105">
              <Link
                to={`/search?searchTerm=${item.posts.length > 0 ? item.posts[0].category : ""}`}
              >
                Zobacz wszystkie
              </Link>
            </span>
          </div>
          <div className="mb-40 flex w-full flex-col items-center lg:flex-row">
            <div className="relative basis-1/2 overflow-hidden rounded-xl">
              {item.posts.length > 0 && (
                <Link
                  to={`/search?searchTerm=${item.posts.map((i) => i.slug)}`}
                >
                  <img
                    className="group-hover: aspect-video w-full object-cover transition-all group-hover:scale-125"
                    src={item.posts[0].image}
                    alt={item.posts[0].title}
                  />
                </Link>
              )}
            </div>
            <div className="ml-0 flex h-[170px] basis-1/2 flex-wrap  gap-3 self-stretch bg-black lg:ml-5">
              {item.categoryInfoCards.map((infoCard, index) => (
                <div
                  key={index}
                  className="flex h-full min-h-[135px] w-full flex-auto flex-col justify-center rounded-xl p-5 shadow-lg last:w-full dark:bg-slate-800 sm:w-[49%] sm:last:text-center"
                >
                  <h5 className="mb-2 text-xs font-semibold uppercase text-slate-400">
                    {infoCard.category}
                  </h5>
                  <p className="font-bold">{infoCard.content}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
