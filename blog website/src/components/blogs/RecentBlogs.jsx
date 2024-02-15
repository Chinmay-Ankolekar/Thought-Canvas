import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        <div>
            <h1>Recent Blogs</h1>
          <button className="border"><Link to='/createBlog'>Create Blog</Link></button>
          <button classname="border"><Link to='/recentBlogs'>Recent Blogs</Link></button>
          <button className="border"><Link to='/dashboard'>Back to home</Link></button>
              {
                blog.map((blog,index) => {
                    return(
                        <div className="max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden m-4" key={index}>
                        <img className="w-full h-48 object-cover object-center" src={blog.imageUrl} alt="" />
                        <div className="p-4">
                            <h2 className="font-bold text-lg">{blog.name}</h2>
                            <p className="text-gray-600 mt-2 line-clamp-3">{blog.description}</p>
                            <p className="text-sm text-gray-500 mt-2">Created at: {blog.created_at}</p>
                            <button onClick={()=> navigate(`/myBlog/${blog.postId}`)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                             Read More
                            </button>
                        </div>
                        </div>
                    )   
                })
              }
        </div>
    );
}

export default RecentBlogs;