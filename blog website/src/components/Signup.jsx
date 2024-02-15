import { useState } from 'react'
import { auth, GoogleProvider } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'

const Signup = () => {
    let navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 

    const signIn = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
            await updateProfile(userCredential.user, {
                displayName: name
            });
            
            alert('User Created')
            navigate('/')
        } catch (error) {
            alert(error.message);
        }
    }
    
console.log(auth);

    
      const signInWithGoogle = async () => {
        try {
          await signInWithPopup(auth, GoogleProvider)
        
        } catch (error) {
          console.log(error.message);
        }
      }

    return (
        <>
            <label>Name</label>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <br />
      <label>Email</label>
     
      <input type="text" onChange={(e)=> setEmail(e.target.value)}/>
      <br />
      <label>Password</label>

      <input type="password" onChange={(e)=> setPassword(e.target.value)}/>
      <br />
      <button onClick={signIn}>Sign Up</button>
      <br />
      <button onClick={signInWithGoogle}>Sign in with Google</button>
        </>
    )
}

export default Signup;