import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  likes: string[];
  numberOfLikes: number;
  postId: string;
  updatedAt: string;
  userId: string;
  __v: number;
}

const DashComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  const { currentUser } = useAppSelector((state) => state.user);
  
  useEffect(() => {
    try {
      const fetchComments = async () => {
        const res = await fetch("/api/comment/getComments?limit=9");

        const data = await res.json();

        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      };

      if (currentUser.isAdmin) {
        fetchComments();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDeleteComment = async () => {
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "Delete",
        },
      );

      //   const data = await res.json();
      if (res.ok) {
        console.log("Komentarz usunięty");
        setComments(
          comments.filter((comment) => comment._id !== commentIdToDelete),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMore = async () => {
    const startIndex = comments.length;

    try {
      const res = await fetch(
        `/api/comment/getComments?startIndex=${startIndex}`,
      );
      const data = await res.json();

      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);

        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="table-auto overflow-x-scroll p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 md:mx-auto">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table>
            <Table.Head>
              <Table.HeadCell>Data ostatniej aktualizacji</Table.HeadCell>
              <Table.HeadCell>Komentarz</Table.HeadCell>
              <Table.HeadCell>Liczba polubień</Table.HeadCell>
              <Table.HeadCell>Id Artykułu</Table.HeadCell>
              <Table.HeadCell>Id Użytkownika</Table.HeadCell>
              <Table.HeadCell>Usuń</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body key={comment._id}>
                <Table.Row>
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                    >
                      Usuń
                    </button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>Nie ma obecnych komentarz</p>
      )}
      {showMore && (
        <Button
          onClick={handleShowMore}
          className="my-3 w-full self-center text-sm text-orange-500"
          color="gray"
          outline
        >
          Pokaż więcej
        </Button>
      )}
      {showModal && (
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
                Czy jesteś pewny, że chcesz usunąć Komentarz?
              </h3>
              <div className="flex justify-center gap-x-4">
                <Button
                  color="failure"
                  onClick={() => {
                    handleDeleteComment();
                    setShowModal(false);
                  }}
                >
                  Tak
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  Nie
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default DashComments;
