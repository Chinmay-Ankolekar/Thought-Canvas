import { useState } from "react"
import { auth, GoogleProvider } from '../config/firebase'
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"

const Login = ({user}) => {
    let navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const Login = async () => {
        try {
          await signInWithEmailAndPassword(auth, email, password)

          if(auth.currentUser.email != null){
            navigate('/dashboard')
          }
        } catch (error) {
          alert(error.message);
        }
      }
      const signOutUser = async () => {
        try {
          await signOut(auth)
        } catch (error) {
          console.log(error.message);
        }
      }

      const signInWithGoogle = async () => {
        try {
          await signInWithPopup(auth, GoogleProvider)
           navigate('/dashboard')
        } catch (error) {
          console.log(error.message);
        }
      }
      console.log(user);

    return (
        <>
            <label>Email</label>
     
     <input type="text" onChange={(e)=> setEmail(e.target.value)}/>
     <br />
     <label>Password</label>

     <input type="password" onChange={(e)=> setPassword(e.target.value)}/>
     <br />
     <button onClick={Login}>Sign Up</button>
     <br />
     <button onClick={signInWithGoogle}>Sign in with Google</button>
     <br />
     <button onClick={signOutUser}>Log out</button>
        </>
    )
}

export default Login