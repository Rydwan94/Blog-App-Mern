import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useAppSelector } from "../app/hooks";
import { Button, Textarea } from "flowbite-react";

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
  onLike: (commentId: string) => Promise<void>;
}

type User = {
  profilePicture: string;
  isAdmin: boolean;
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const Comment = ({
  comment,
  onLike,
  onEdit,
  onDelete
}: {
  comment: Comment;
  onLike: (commentId: string) => Promise<void>;
  onEdit: (comment: { _id: string }, editedContent: string) => void;
  onDelete: (commentId:string) => void
}) => {
  const { userId } = comment;
  const [user, setUser] = useState<User | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editedComment, setEditedComment] = useState<string>(comment.content);
  const { currentUser } = useAppSelector((state) => state.user);

  const isLiked = comment.likes.includes(currentUser._id);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [userId]);


  const handleCancelEdit = () => setIsEdit(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedComment,
        }),
      });

      // const data = await res.json();
      if (res.ok) {
        setIsEdit(false);
        onEdit(comment, editedComment);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex border-b p-4 text-sm dark:border-gray-600">
      <div>
        <img
          src={user?.profilePicture}
          alt={user?.username}
          className="mr-3 h-10 w-10 flex-shrink-0 rounded-full bg-gray-200"
        />
      </div>
      {isEdit ? (
        <form className="w-full" onSubmit={handleUpdate}>
          <Textarea
            className="p-0 placeholder:p-2"
            placeholder="Dodaj komentarz"
            value={editedComment}
            maxLength={200}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setEditedComment(e.target.value)
            }
          ></Textarea>
          <p className="text-xs text-gray-500">
            {200 - editedComment.length === 0 ? (
              <p className="text-red-500">Wykorzystano limit znaków</p>
            ) : (
              `${200 - editedComment.length} pozostałych znaków`
            )}{" "}
          </p>
          <div className="my-3 flex justify-between">
            <Button type="submit" gradientDuoTone="pinkToOrange">
              Zapisz
            </Button>
            <Button
              type="button"
              outline
              gradientDuoTone="pinkToOrange"
              onClick={handleCancelEdit}
            >
              Anuluj
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex-1">
          <div className="mb-1 flex items-center">
            <span className="mr-1 truncate text-xs font-bold">
              {user ? `@${user?.username}` : "Anonimowy użytkownik"}
            </span>
            <span className="text-xs text-gray-500">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>
          <p className="mb-2 text-gray-500">{comment.content}</p>
          <div className="flex max-w-fit items-center gap-2 border-t pt-2 text-xs dark:border-gray-700">
            <button
              type="button"
              className={`text-sm text-gray-400 transition-all hover:text-blue-500 ${currentUser && isLiked && "!text-blue-500"}`}
              onClick={() => onLike(comment._id)}
            >
              <FaThumbsUp />
            </button>
            <p className="text-gray-300">
              {comment.numberOfLikes > 0 &&
                `${comment.numberOfLikes} ${comment.numberOfLikes === 1 ? "polubienie" : "polubień"}`}
            </p>
            {currentUser &&
              (currentUser.id === comment.userId || currentUser.isAdmin) && (
                <>
                  <button
                    className="text-gray-500 hover:text-blue-500"
                    onClick={() => setIsEdit(true)}
                  >
                    Edytuj
                  </button>
                  <button type="button" className="text-gray-500 hover:text-red-500" onClick={() => onDelete(comment._id)}>
                    Usuń
                  </button>
                </>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
