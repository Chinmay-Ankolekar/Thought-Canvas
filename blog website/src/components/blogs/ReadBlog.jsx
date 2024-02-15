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
          <p class="text-gray-500">Published {blog[0].created_at}</p>
          <h1 class="mt-2 text-3xl font-bold text-gray-900 sm:text-5xl">
            {blog[0].name}
          </h1>
          <p class="mt-6 text-lg text-gray-700">
            You're doing marketing the wrong way
          </p>
          <div
            class="mt-6 flex flex-wrap justify-center gap-2"
            aria-label="Tags"
          >
            <button class="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">
              {blog[0].category}
            </button>
          </div>
          <img
            class="sm:h-[34rem] mt-10 w-full object-contain"
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Featured Image"
          />
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

      


      {/*             
            {blog.length > 0 && (
                <>
                    <h1>{blog[0].name}</h1>
                    <img src={blog[0].imageUrl} width="500" alt="" />
                    <p>{blog[0].description}</p>
                    <p>Created at: {blog[0].created_at}</p>
                    <p className="flex items-center">
  <img src={blog[0].profile_pic} alt="" width="20" className="rounded-full mr-2" />
  <span className="text-gray-600">Written by: {blog[0].written_by}</span>
</p>
                  
                {userId === blog[0].userId && (
                    <button className="border" onClick={() => deleteBlog(blog[0].postId)}>Delete</button>
                )}
                
                    

                </>
            )}
            <button className="border" onClick={()=> {navigate('/dashboard')}}>Back to Homepage</button>
            <button className="border" onClick={()=> {navigate('/recentBlogs')}}>Back to Recent Blog</button> */}

      <Comments postId={postId} user={userId} />
    </div>
  );
};

export default ReadBlog;
