import { useEffect, useState } from "react";
import moment from "moment";

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

export default function Comment({ comment }: { comment: Comment }) {
  const { userId } = comment;
  const [user, setUser] = useState<User | null>(null);

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

  return (
    <div className="flex border-b p-4 text-sm dark:border-gray-600">
      <div>
        <img
          src={user?.profilePicture}
          alt={user?.username}
          className="mr-3 h-10 w-10 flex-shrink-0 rounded-full bg-gray-200"
        />
      </div>
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
      </div>
    </div>
  );
}
