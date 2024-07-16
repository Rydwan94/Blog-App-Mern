import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

interface User {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: string[];
  numberOfLikes: number;
  postId: string;
  userId: string;
  __v: number;
}

interface Post {
  image: string;
  slug: string;
  category: string;
  createdAt: Date;
  title: string;
}

const DashBoardPanel = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  console.log(users);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();

        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);
  return (
    <div className="p-3 md:mx-auto">
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex w-full flex-col gap-4 rounded-md p-3 shadow-md dark:bg-slate-800 md:w-72">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-md uppercase text-gray-500">
                Wszyscy użytkownicy
              </h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="rounded-full bg-teal-600 p-3 text-5xl text-white shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              {<HiArrowNarrowUp />}
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Ostatni miesiąc</div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 rounded-md p-3 shadow-md dark:bg-slate-800 md:w-72">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-md uppercase text-gray-500">
                Wszystkie komentarze
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="rounded-full bg-indigo-600 p-3 text-5xl text-white shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              {<HiArrowNarrowUp />}
              {lastMonthComments}
            </span>
            <div className="text-gray-500">Ostatni miesiąc</div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 rounded-md p-3 shadow-md dark:bg-slate-800 md:w-72">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-md uppercase text-gray-500">
                Wszystkie Posty
              </h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="rounded-full bg-lime-600 p-3 text-5xl text-white shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              {<HiArrowNarrowUp />}
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Ostatni miesiąc</div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex flex-wrap justify-center gap-5 py-3">
        <div className="flex w-full flex-col rounded-md p-2 shadow-md dark:bg-gray-800 md:w-auto">
          <div className="flex items-center justify-between p-3 text-sm font-semibold">
            <h1 className="p-2 text-center">Ostatni użytkownicy</h1>
            <Link to="/dashboard?tab=users">
              <Button outline gradientDuoTone="pinkToOrange">
                Zobacz wszystkich
              </Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Zdjęcie użytkownika</Table.HeadCell>
              <Table.HeadCell>Nazwa użytkownika</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt="user"
                        className="h-10 w-10 rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex w-full flex-col rounded-md p-2 shadow-md dark:bg-gray-800 md:w-auto">
          <div className="flex items-center justify-between p-3 text-sm font-semibold">
            <h1 className="p-2 text-center">Ostatnie komentarze</h1>
            <Link to="/dashboard?tab=comments">
              <Button outline gradientDuoTone="pinkToOrange">
                Zobacz wszystkie
              </Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Komentarz</Table.HeadCell>
              <Table.HeadCell>Polubienia</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex w-full flex-col rounded-md p-2 shadow-md dark:bg-gray-800 md:w-auto">
          <div className="flex items-center justify-between p-3 text-sm font-semibold">
            <h1 className="p-2 text-center">Ostatnie Posty</h1>
            <Link to="/dashboard?tab=posts">
              <Button outline gradientDuoTone="pinkToOrange">
                Zobacz wszystkie
              </Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Zdjęcie Artykułu</Table.HeadCell>
              <Table.HeadCell>Tytuł</Table.HeadCell>
              <Table.HeadCell>Kategoria</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post.slug} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt="user"
                        className="h-10 w-14 bg-gray-500 object-cover"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-96">{post.title}</Table.Cell>
                    <Table.Cell className="w-5">{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPanel;
