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

            {blog.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((blog, index) => (
  <div
    key={index}
    className="m-10 mx-4 max-w-screen-lg overflow-hidden rounded-xl border shadow-lg md:pl-8"
  >
    <div className="flex flex-col overflow-hidden bg-white sm:flex-row md:h-64">
      <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
        <Link to='/login' className="text-lg md:text-md font-bold text-gray-900 lg:text-xl">
          {blog.name}
        </Link>
        <p className="mt-4 mb-2 max-w-md text-gray-500">
          {blog.description.split(" ").slice(0, 20).join(" ")}
          {blog.description.split(" ").length > 50 ? "..." : ""}
        </p>
        <Link to={`/profile/${blog.userId}`} className="mt-auto text-gray-600 text-sm flex items-center">
  {blog.profile_pic ? (
    <img src={blog.profile_pic} alt="" className="h-8 w-8 rounded-full mr-2" />
  ) : (
    <span class="inline-block size-[38px] bg-gray-100 rounded-full overflow-hidden mr-2">
    <svg class="size-full text-gray-300" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="white"/>
      <path d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z" fill="currentColor"/>
      <path d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z" fill="currentColor"/>
    </svg>
  </span>
  )}
  {blog.written_by}
</Link>



        <button
          onClick={() => navigate(`/myBlog/${blog.postId}`) }
          className="group mt-2 flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition"
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