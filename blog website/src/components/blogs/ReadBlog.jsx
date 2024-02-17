import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Comments from "./Comments";
import Navbar from "./Navbar";

const ReadBlog = ({ user }) => {
  let navigate = useNavigate();
  const userId = user.auth.currentUser.uid;
  const { postId } = useParams();
  console.log(postId);
  const [blog, setBlogs] = useState([]);

  const BlogCollectionRef = collection(db, "blog");

  const getBlogbyPostId = async () => {
    try {
      const querySnapshot = await getDocs(
        query(BlogCollectionRef, where("postId", "==", postId))
      );

      const blogs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      console.log(blogs);
      setBlogs(blogs);
    } catch (error) {
      console.error("Error getting blogs: ", error);
    }
  };
  //   getBlogbyPostId();

  const deleteBlog = async (postId) => {
    try {
      const BlogDoc = doc(db, "blog", postId);
      await deleteDoc(BlogDoc);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBlogbyPostId();
  }, []);

  return (
    <div>
      <Navbar />

      <main>
  <article>
    <header class="mx-auto max-w-screen-xl pt-28 text-center">
      {blog.length > 0 && (
        <>
          <p class="text-gray-500">
            Published{" "}
            <time className="text-md" dateTime={blog[0].created_at}>
              {new Date(blog[0].created_at).toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "numeric",
              })}
            </time>
          </p>
          <h1 class="mt-2 text-3xl font-bold text-gray-900 sm:text-5xl">
            {blog[0].name}
          </h1>
          <p class="mt-6 text-lg text-gray-700">{blog[0].sub_title}</p>
          <div
            class="mt-6 flex flex-wrap justify-center gap-2"
            aria-label="Tags"
          >
            <button class="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">
              {blog[0].category}
            </button>
          </div>
          {blog[0].imageUrl === "" ? null : (
            <img
              class="sm:h-[34rem] mt-10 w-full object-contain"
              src={blog[0].imageUrl}
              alt="Featured Image"
            />
          )}
        </>
      )}
    </header>

    <div class="mx-auto mt-10 max-w-screen-md space-y-12 px-4 py-10 font-serif text-lg tracking-wide text-gray-700">
      {blog.length > 0 && <p>{blog[0].description}</p>}
      
      {blog.length > 0 && (
        <>
          <div className="flex items-center mt-3">
            <p className="text-gray-600 text-sm">Written By: </p>
            
            {blog[0].profile_pic ? (
              <img
                src={blog[0].profile_pic}
                alt="Profile Pic"
                className="h-8 w-8 rounded-full mr-2"
              />
            ) : (
              <span class="inline-block size-[38px] bg-gray-100 rounded-full overflow-hidden">
                <svg
                  class="size-full text-gray-300"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.62854"
                    y="0.359985"
                    width="15"
                    height="15"
                    rx="7.5"
                    fill="white"
                  />
                  <path
                    d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
                    fill="currentColor"
                  />
                  <path
                    d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            )}
            
            <Link to={`/profile/${blog[0].userId}`} className="text-gray-600 text-sm">{blog[0].written_by}</Link>
          </div>
          
          <div class="flex justify-center">
            {
              blog[0].written_by === user.auth.currentUser.displayName ? (
                <button
                onClick={() => deleteBlog(blog[0].postId)}
                 class="mt-6 px-4 py-2 text-sm font-medium leading-5 text-white uppercase transition-colors duration-150 bg-red-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-blue active:bg-blue-600 hover:bg-red-700"
               >
                 Delete Blog
               </button>
              ) : null
            }
            {/* <button
             onClick={() => deleteBlog(blog[0].postId)}
              class="mt-6 px-4 py-2 text-sm font-medium leading-5 text-white uppercase transition-colors duration-150 bg-red-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-blue active:bg-blue-600 hover:bg-red-700"
            >
              Delete Blog
            </button> */}
          </div>
        </>
      )}
    </div>
  </article>
</main>


      <div class="w-fit mx-auto mt-10 flex space-x-2">
        <div class="h-0.5 w-2 bg-gray-600"></div>
        <div class="h-0.5 w-32 bg-gray-600"></div>
        <div class="h-0.5 w-2 bg-gray-600"></div>
      </div>

      <Comments postId={postId} user={userId} />
    </div>
  );
};

export default ReadBlog;
