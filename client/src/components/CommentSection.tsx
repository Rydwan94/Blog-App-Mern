import React, { FormEventHandler, useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";
import Comment from "./Comment";

interface Comment {
  _id: string;
  createdAt: string;
  updatedAt: string;
  likes: string[];
  numberOfLikes: number;
  postId: string;
  userId: string;
  __v: number;
}

const CommentSection = ({ postId }: { postId: string | undefined }) => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);


  useEffect(() => {
    const handleFetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);

        const data = await res.json();
        if (res.ok) {
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleFetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment.length > 200 || comment.length < 1) {
      setCommentError("Komentarz musi mieć od 1 do 200 znaków.");

      return;
    }

    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments])
      } else {
        console.log(data.message);
        setCommentError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl ">
      {currentUser ? (
        <div className="my-5 flex items-center gap-2 text-sm text-gray-500">
          <p>Zalogowany jako:</p>
          <img
            className="h-5 w-5 rounded-full object-cover"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @ {currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="my-5 flex gap-1 text-sm text-teal-500">
          Musisz być zalogowany/a aby dodać komentarz.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Zaloguj się
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="rounded-md border border-orange-500 p-3"
        >
          <Textarea
            className="p-0 placeholder:p-2"
            placeholder="Dodaj komentarz"
            value={comment}
            rows={4}
            maxLength={200}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setComment(e.target.value)
            }
          />
          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {200 - comment.length === 0 ? (
                <p className="text-red-500">Wykorzystano limit znaków</p>
              ) : (
                `${200 - comment.length} pozostałych znaków`
              )}{" "}
            </p>
            <Button outline gradientDuoTone="pinkToOrange" type="submit">
              Dodaj Opinie
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}

      {comments.length === 0 ? (
        <p className="my-5 text-sm">Brak komentarzy</p>
      ) : (
        <>
          <div className="my-5 flex items-center text-sm">
            <p>Komentarze</p>
            <div className="border-1 ml-2 max-w-fit rounded-lg border border-gray-500 px-2 py-1">
              <p>{comments.length}</p>
            </div>
          </div>
          <div>
            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CommentSection;
