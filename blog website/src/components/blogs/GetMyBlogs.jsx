import { collection, getDocs, where, query } from "firebase/firestore";
import { useEffect,useState } from "react";
import { db } from "../../config/firebase";

const GetMyBlogs = ({user}) => {
    const userId = user.auth.currentUser.uid;
    const [blog, setBlogs] = useState([]);
   
    const BlogCollectionRef = collection(db, "blog");

    const getBlogs = async () => {
        try {
          const querySnapshot = await getDocs(query(BlogCollectionRef, where("userId", "==", userId)));
          const blogs = querySnapshot.docs.map((doc) => ({
            ...doc.data()
          }))
          console.log(blogs);
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
        
        </>
    )
}

export default GetMyBlogs;