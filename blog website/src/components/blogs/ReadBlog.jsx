import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";

const ReadBlog = ({ user }) => {
    let navigate = useNavigate();
    const userId = user.auth.currentUser.uid;
    const { postId } = useParams();
    console.log(postId);
    const [blog, setBlogs] = useState([]);

    const BlogCollectionRef = collection(db, "blog");

    const getBlogbyPostId = async () => {
        try {
            const querySnapshot = await getDocs(query(BlogCollectionRef, where("postId", "==", postId)));

            const blogs = querySnapshot.docs.map((doc) => ({
                ...doc.data()
            }));
            console.log(blogs);
            setBlogs(blogs);
        } catch (error) {
            console.error("Error getting blogs: ", error);
        }
    };

    const deleteBlog = async (postId) => {
        try {
            const BlogDoc = doc(db, "blog", postId);
            await deleteDoc(BlogDoc);
            navigate('/dashboard');
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getBlogbyPostId();
    }, []);

    return (
        <div>
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
            <button className="border" onClick={()=> {navigate('/recentBlogs')}}>Back to Recent Blog</button>

            <Comments postId={postId} user={userId} />
        </div>
    );
};

export default ReadBlog;
