import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import GetMyBlogs from "./GetMyBlogs";
import Navbar from "./Navbar";

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

    return(
        <>
          <Navbar/>
          <GetMyBlogs user={user}/>
        </>
    )
}

export default Dashboard;