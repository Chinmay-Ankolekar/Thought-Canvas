import { useState, useEffect } from 'react'
import { Route, Routes,Navigate } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Dashboard from './components/blogs/Dashboard';
import CreateBlog from './components/blogs/CreateBlog';
import ReadBlog from './components/blogs/ReadBlog';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);


  return (
    <>
    <Routes>
        <Route path={'/'} element={<Login user={user}/>} />
        <Route path={'/signup'} element={<Signup/>} />

        {user ? (
          <Route path={'/dashboard'} element={<Dashboard user={user}/>} />
        ) : (
          ""
        )}
        {user ? (
          <Route path={'/createBlog'} element={<CreateBlog user={user}/>} />
        ) : (
          ""
        )}
        {user ? (
          <Route path={'/myBlog/:postId'} element={<ReadBlog user={user}/>} />
        ) : (
          ""
        )}
      </Routes>
    </>
  )
}

export default App
