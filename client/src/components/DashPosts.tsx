import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

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
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [postIdToDelete, setPostIdToDelete] = useState('')

  const { currentUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();

        if (res.ok) {
          setUserPosts(data);
          if(data.posts.length < 9) {
            setShowMore(false)
          }
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

  const handleShowMore = async () => {
    const startIndex = userPosts.posts.length
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
      const data = await res.json()

      if(res.ok){
        setUserPosts(prev => ({ posts: [...prev.posts, ...data.posts] }));

        if(data.posts.length < 9){
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleDeletePost = async () => {
    setShowModal(false)
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
        method: "DELETE"
      })
      const data = await res.json()

      if(res.ok){
        setUserPosts(prev => ({ posts: prev.posts.filter(post => post._id !== postIdToDelete) }));
      }else {
        setFetchError(data.message)
      }

    } catch (error) {
      console.log(error)
    }
  }

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
                    <span onClick={() => {
                      setShowModal(true)
                      setPostIdToDelete(post._id)
                    }} className="cursor-pointer font-medium text-red-500 hover:underline">
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

          {
            showMore && (
              <Button onClick={handleShowMore} className="w-full text-orange-500 self-center text-sm my-3" color="gray" outline>Show more</Button>
            )
          }
        </>
      ) : (
        <p>Nie ma obecnych postów</p>
      )}
       <Modal
          className="animate-fade-up backdrop-blur-sm"
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg text-gray-400 dark:text-gray-400">
                Czy jesteś pewny, że chcesz usunąć Post?
              </h3>
              <div className="flex justify-center gap-x-4">
                <Button color="failure" onClick={handleDeletePost}>
                  Tak
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  Nie
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
    </div>
  );
};

export default DashPosts;
