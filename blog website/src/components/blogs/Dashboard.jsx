import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import GetMyBlogs from "./GetMyBlogs";

const Dashboard = ({user}) => {
  let navigate = useNavigate()
  const signOutUser = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }
  }

  console.log(user)
    return(
        <>
          <h1>Hii</h1>
          <button className="border" onClick={signOutUser}>SignOut</button>
          <button className="border"><Link to='/createBlog'>Create Blog</Link></button>
          <GetMyBlogs user={user}/>
        </>
    )
}

export default Dashboard;