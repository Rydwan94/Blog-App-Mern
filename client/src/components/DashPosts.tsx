import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

type Post = {
  category: string;
  content: string;
  createdAt: string;
  image: string;
  slug: string;
  title: string;
  updatedAt: string;
  userId: string;
  __v: number;
  _id: string;
};

const DashPosts = () => {
  const [userPosts, setUserPosts] = useState<{ posts: Post[] }>({ posts: [] });
  const [fetchError, setFetchError] = useState<null | string>(null);
  const { currentUser } = useAppSelector((state) => state.user);
  console.log(userPosts);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();

        if (res.ok) {
          setUserPosts(data);
        } else {
          setFetchError(data.message);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      getPosts();
    }
  }, [currentUser._id]);

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.posts?.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Data aktualizacji</Table.HeadCell>
              <Table.HeadCell>Zdjęcia Posta</Table.HeadCell>
              <Table.HeadCell>Tytuł</Table.HeadCell>
              <Table.HeadCell>Kateoria</Table.HeadCell>
              <Table.HeadCell>Usuń</Table.HeadCell>
              <Table.HeadCell>
                <span>Edytuj</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.posts.map((post) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        className="h-10 w-20 bg-gray-500 object-cover"
                        src={post.image}
                        alt={post.title}
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span className="cursor-pointer font-medium text-red-500 hover:underline">
                      Usuń
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edytuj</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>Nie ma obecnych postów</p>
      )}
    </div>
  );
};

export default DashPosts;
