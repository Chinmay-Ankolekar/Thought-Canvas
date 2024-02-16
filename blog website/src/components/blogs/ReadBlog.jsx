import { useParams } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
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
          <p class="text-gray-500">Published <time className="text-md" dateTime={blog[0].created_at}>
  {new Date(blog[0].created_at).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric'
  })}
</time></p>
          <h1 class="mt-2 text-3xl font-bold text-gray-900 sm:text-5xl">
            {blog[0].name}
          </h1>
          <p class="mt-6 text-lg text-gray-700">
            {blog[0].sub_title}
          </p>
          <div
            class="mt-6 flex flex-wrap justify-center gap-2"
            aria-label="Tags"
          >
            <button class="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">
              {blog[0].category}
            </button>
          </div>
          {
            blog[0].imageUrl === "" ? null : (
              <img
                class="sm:h-[34rem] mt-10 w-full object-contain"
                src={blog[0].imageUrl}
                alt="Featured Image"
              />
            )
          }
        </>
      )}
    </header>

    <div class="mx-auto mt-10 max-w-screen-md space-y-12 px-4 py-10 font-serif text-lg tracking-wide text-gray-700">
      {blog.length > 0 && <p>{blog[0].description}</p>}
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
