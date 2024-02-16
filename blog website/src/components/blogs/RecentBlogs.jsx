import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const RecentBlogs = () => {
    let navigate = useNavigate();
    const [blog, setBlogs] = useState([]);
    const BlogCollectionRef = collection(db, "blog");
  
    const getBlogs = async () => {
        try {
          const querySnapshot = await getDocs(BlogCollectionRef);
          const blogs = querySnapshot.docs.map((doc) => ({
            ...doc.data()
          }))
          
          
          setBlogs(blogs)
        } catch (error) {
          console.error("Error getting movies: ", error);
        }
      };

        useEffect(() => {
            getBlogs();
        }, []);

    return (
      <>
        <div>
            <Navbar/>

            {
              blog.length === 0 ? <h1 className="text-center mb-4 text-2xl font-bold text-gray-800">No Blogs Found</h1> : 

              <section className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="flex justify-center">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="mb-10 md:mb-16">
              <h2 className="mb-2 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
               Recent Blogs
              </h2>
            </div>

            {blog
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((blog, index) => (
                <div
                  key={index}
                  className="m-10 mx-4 max-w-screen-lg overflow-hidden rounded-xl border shadow-lg md:pl-8"
                >
                  <div className="flex flex-col overflow-hidden bg-white sm:flex-row md:h-64">
                    <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
                      <Link
                        to="/login"
                        className="text-lg md:text-md font-bold text-gray-900 lg:text-xl"
                      >
                        {blog.name}
                      </Link>
                      <p className="mt-4 mb-8 max-w-md text-gray-500">
                        {blog.description.split(" ").slice(0, 20).join(" ")}
                        {blog.description.split(" ").length > 50 ? "..." : ""}
                      </p>
                      <button
  onClick={() => navigate(`/myBlog/${blog.postId}`)}
  className="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition"
>
  <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold text-sm">
    Read More
  </span>
</button>
                    </div>
                    <div className="order-first ml-auto h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5">
                      <img
                        className="h-full w-full object-cover"
                        src={blog.imageUrl}
                        loading="lazy"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
            }
         
        
             
        </div>
        </>
    );
}

export default RecentBlogs;