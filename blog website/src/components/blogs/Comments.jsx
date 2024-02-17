import { useState, useEffect } from "react";
import { auth, db } from "../../config/firebase";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Comments = ({ postId }) => {
  const userId = auth.currentUser.uid;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const CommentsCollectionRef = collection(db, "comments");

  const onSubmit = async () => {
    try {
      await addDoc(CommentsCollectionRef, {
        postId: postId,
        userId: userId,
        comment: comment,
        profile_pic: auth.currentUser.photoURL,
        written_by: auth.currentUser.displayName,
        commented_at: new Date().toLocaleString(),
      });
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const getComments = async () => {
    try {
      const querySnapshot = await getDocs(
        query(CommentsCollectionRef, where("postId", "==", postId))
      );
      const comments = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setComments(comments);
    } catch (error) {
      console.error("Error getting comments: ", error);
    }
  };



  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-bold mt-8 mb-4">Comments</h1>
      {comments.map((comment, index) => {
        return (
          <div key={index} className="border rounded-lg p-4 mb-4">
            <p>{comment.comment}</p>
            <p className="flex items-center">
              {comment.profile_pic ? (
                <img
                  src={comment.profile_pic}
                  alt=""
                  width="20"
                  className="rounded-full mr-1"
                />
              ) : (
                <span class="inline-block size-6 bg-gray-100 rounded-full overflow-hidden">
  <svg class="size-full text-gray-300" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="white"/>
    <path d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z" fill="currentColor"/>
    <path d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z" fill="currentColor"/>
  </svg>
</span>
              
              )}

              {/* <img
                src={comment.profile_pic}
                alt=""
                width="20"
                className="rounded-full"
              /> */}
              <Link to={`/profile/${comment.userId}`} className="text-gray-600">
                 {comment.written_by}
              </Link>
            </p>
            <time className="text-xs" dateTime={comment.commented_at}>
  {new Date(comment.commented_at).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric'
  })}
</time>
            {/* <p> {comment.commented_at}</p> */}
          </div>
        );
      })}

      <div className="mt-4 flex items-start border-t border-gray-300 sm:p-8 py-4 text-left text-gray-700">
        <textarea
          cols="1"
          rows="1"
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your Comment"
          className="mr-4 overflow-hidden flex-1 cursor-text resize-none rounded-md bg-white text-sm py-2 sm:py-0 font-normal text-gray-600 opacity-70 shadow-none outline-none focus:text-gray-600 focus:opacity-100"
        ></textarea>
        <button
          onClick={onSubmit}
          className="relative inline-flex h-10 w-auto flex-initial cursor-pointer items-center justify-center self-center rounded-md bg-blue-700 px-6 text-center align-middle text-sm font-medium text-white outline-none focus:ring-2"
        >
          Add Comment
        </button>
      </div>

      <div className="flex m-4">
        <Link
          to="/dashboard"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded inline-flex items-center"
        >
          Back to Homepage
        </Link>
        <Link
          to="/recentBlogs"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          Back to Recent Blogs
        </Link>
      </div>
    </div>
  );
};

export default Comments;
