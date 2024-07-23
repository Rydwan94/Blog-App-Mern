import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import { FaHeart } from "react-icons/fa";
import { useAppSelector } from "../app/hooks";

const PostPage = () => {
  type Post = {
    category: string;
    content: string;
    createdAt: Date;
    image: string;
    slug: string;
    title: string;
    updatedAt: string;
    userId: string;
    likes: string[];
    numberOfLikes: number;
    __v: number;
    _id: string;
  };

  const [post, setPost] = useState<Post | null>(null);
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [recentsPost, setRecentPosts] = useState<Post[]>([]);
  const { currentUser } = useAppSelector((state) => state.user);
  const isLiked = post?.likes.includes(currentUser._id);
  console.log(isLiked);
  useEffect(() => {
    const handleFetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          const post = data.posts[0];
          post.createdAt = new Date(post.createdAt);
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
          return;
        }
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    handleFetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };

      fetchRecentPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleLikePost = async () => {
    try {
      if (!currentUser) {
        console.log("Nie jesteś zalogowany");
        return;
      }

      const res = await fetch(`/api/post/likePost/${post?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentUser._id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setPost((prevPost) => {
          if (!prevPost) return prevPost;

          return {
            ...prevPost,
            numberOfLikes: data.likes.length,
            likes: data.likes,
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading || error)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col p-3">
      <h1 className="mx-auto mt-10 max-w-2xl p-3 text-center font-serif text-3xl lg:text-4xl">
        {post?.title}
      </h1>
      <Link
        to={`/search?category=${post?.category}`}
        className="mt-5 self-center"
      >
        <Button color="gray" pill size="xs">
          {post?.category}
        </Button>
      </Link>
      <img
        src={post?.image}
        alt={post?.title}
        className="mt-10 max-h-[600px] w-full rounded-md object-cover"
      />
      <div className="max-w-2-xl flex items-center justify-between border-b border-slate-300 p-3 text-xs ">
        <span onClick={handleLikePost} className="relative">
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white">
            {post?.numberOfLikes}
          </p>
          <FaHeart
            className={`text-2xl ${post?.numberOfLikes && post.numberOfLikes > 0 && "text-red-600"}`}
          />
        </span>
        <span>{post && post.createdAt.toLocaleDateString()}</span>
        <span className="italic">
          {post?.content
            ? `${(post.content.length / 1000).toFixed(0)} minut czytania`
            : "Czas czytania niedostępny"}
        </span>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: post?.content || "" }}
        className="post-content mx-auto w-full max-w-3xl p-3"
      ></div>
      <div className="mx-auto w-full max-w-4xl">
        <CallToAction />
      </div>
      <CommentSection postId={post?._id} />
      <div className="mb-5 flex flex-col items-center justify-center">
        <h1 className="mt-5 text-xl">Ostatnie Artykuły</h1>
        <div className="mt-10 flex min-w-full flex-wrap justify-evenly gap-20 xl:flex-nowrap">
          {recentsPost &&
            recentsPost.map((post) => <PostCard key={post._id} {...post} />)}
        </div>
      </div>
    </main>
  );
};

export default PostPage;
