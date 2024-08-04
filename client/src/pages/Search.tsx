import { Button, Select, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import SearchedBlogCard from "../components/SearchedBlogCard";

interface Post {
  _id?: string;
  image: string;
  slug: string;
  category: string;
  createdAt: Date;
  title: string;
}

interface SidebarData {
  searchTerm: string;
  sort: string;
  category: string;
}

const Search = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarData, setSidebarData] = useState<SidebarData>({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm") || "";
    const sortFromUrl = urlParams.get("sort") || "desc";
    const categoryFromUrl = urlParams.get("category") || "uncategorized";
    setSidebarData({
      searchTerm: searchTermFromUrl,
      sort: sortFromUrl,
      category: categoryFromUrl,
    });

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      try {
        const res = await fetch(`/api/post/getposts?limit=5&${searchQuery}`);
        const data = await res.json();

        if (!res.ok) {
          setLoading(false);
          return;
        }

        setPosts(data.posts);
        setLoading(false);

        if (data.posts.length === 5) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSidebarData({ ...sidebarData, [e.target.id]: e.target.value });
  };

  const handleOnSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    if (sidebarData.category !== "uncategorized") {
      urlParams.set("category", sidebarData.category);
    } else {
      urlParams.delete("category");
    }
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;

    try {
      setLoading(true);
      const urlParams = new URLSearchParams({
        startIndex: startIndex.toString(),
        limit: '5',
      });

      if (sidebarData.category !== 'uncategorized') {
        urlParams.set('category', sidebarData.category);
      }

      const res = await fetch(`/api/post/getposts?${urlParams.toString()}`);
      const data = await res.json();

      if (res.ok) {
        const newPosts = data.posts;
        setPosts((prev) => [...prev, ...newPosts]);

        setShowMore(newPosts.length === 5)
      } else {
        console.error('Failed to load more posts');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <aside className=" p-5 md:min-h-full md:basis-1/5 shadow-2xl dark:bg-slate-900">
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label
              htmlFor="searchTerm"
              className="whitespace-nowrap font-semibold"
            >
              Wyszukaj:
            </label>
            <TextInput
              placeholder="Szukaj..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="whitespace-nowrap font-semibold">
              Sortuj:
            </label>
            <Select
              className="w-full"
              id="sort"
              onChange={handleChange}
              value={sidebarData.sort}
            >
              <option value="desc">Najnowsze</option>
              <option value="asc">Najstarsze</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="category"
              className="whitespace-nowrap font-semibold"
            >
              Kategoria:
            </label>
            <Select
              className="w-full"
              id="category"
              onChange={handleChange}
              value={sidebarData.category}
            >
              <option value="uncategorized">Wszystkie</option>
              <option value="produkty">Produkty</option>
              <option value="płatności">Płatności</option>
              <option value="dostawy">Dostawy</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="pinkToOrange">
            Szukaj
          </Button>
        </form>
      </aside>
      <main className="flex w-full flex-col">
        <div className="flex min-h-screen flex-wrap justify-center gap-5 p-7 sm:justify-start">
          {!loading && posts.length === 0 && <p>Nie znaleziono postów</p>}
          {loading && (
            <Spinner className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform" />
          )}
          {!loading &&
            posts.map((post) => (
              <SearchedBlogCard content={""} key={post._id} {...post} />
            ))}
        </div>
        <div className="self-center py-7">
          {showMore && (
            <button
              className="transform text-lg text-teal-500 transition-all hover:scale-110 hover:underline"
              onClick={handleShowMore}
            >
              Pokaż więcej
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
