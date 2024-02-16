import { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Dashboard from './components/blogs/Dashboard';
import CreateBlog from './components/blogs/CreateBlog';
import ReadBlog from './components/blogs/ReadBlog';
import RecentBlogs from './components/blogs/RecentBlogs';
import Homepage from './components/blogs/HomePage';
import Profile from './components/blogs/Profile';
import Page_404 from './components/blogs/Page_404';

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
        <Route path={'/login'} element={<Login user={user} />} />
        <Route path={'/'} element={<Homepage />} />
        <Route path={'/signup'} element={<Signup />} />

        {user ? (
          <>
            <Route path={'/dashboard'} element={<Dashboard user={user} />} />
            <Route path={'/createBlog'} element={<CreateBlog user={user} />} />
            <Route path={'/myBlog/:postId'} element={<ReadBlog user={user} />} />
            <Route path={'/recentBlogs'} element={<RecentBlogs />} />
            <Route path={'/profile/:userId'} element={<Profile user={user} />} />
          </>
        ) : (
          <>
          ""
          </>
        )}
      </Routes>
    </>
  )
}

export default App

