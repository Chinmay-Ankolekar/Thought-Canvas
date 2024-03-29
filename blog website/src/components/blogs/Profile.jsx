import { db } from "../../config/firebase";
import {
  collection,
  where,
  query,
  getDocs,
  getDoc,
  limit,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import GetMyBlogs from "./GetMyBlogs";

const Profile = ({ user }) => {
  const { userId } = useParams();
  console.log(userId);
  let navigate = useNavigate();
  const [blog, setBlogs] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [creationTime, setCreationTime] = useState("");
  const [blogLength, setBlogLength] = useState(0);

  const BlogCollectionRef = collection(db, "blog");
  const UserCollectionRef = collection(db, "users");

  const getBlogs = async () => {
    try {
      const querySnapshot = await getDocs(
        query(BlogCollectionRef, where("userId", "==", userId))
      );
      const blogs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      console.log(blogs);
      setBlogLength(blogs.length);
      setBlogs(blogs);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const getUser = async () => {
    try {
      const querySnapshot = await getDocs(
        query(UserCollectionRef, where("userId", "==", userId), limit(1))
      );
      const user = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      console.log(user);
      setUserName(user[0].name);
      setUserPhoto(user[0].profile_pic);
      setUserEmail(user[0].email);
      setCreationTime(user[0].creationTime);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getBlogs();
    getUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div class="m-10 max-w-sm">
          <div class="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
            <div class="relative mx-auto w-36 rounded-full">
              <span class="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
              <img
                class="mx-auto h-auto w-full rounded-full"
                src={userPhoto ? userPhoto : ""}
                alt=""
              />
            </div>
            <h1 class="my-1 text-center text-xl font-bold leading-8 text-gray-900">
              {userName}
            </h1>
            <h3 class="font-lg text-semibold text-center leading-6 text-gray-600">
              {userEmail}
            </h3>
            <ul class="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
              <li class="flex items-center py-3 text-sm">
                <span>Blogs Written</span>
                <span class="ml-auto">
                  <span class="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                    {blogLength}Blogs
                  </span>
                </span>
              </li>
              <li class="flex items-center py-3 text-sm">
                <span>Joined On:</span>
                <span class="ml-auto">
                  {new Date(creationTime).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {
        blog.length === 0 ? <><h1 className="text-center mb-4 text-2xl font-bold text-gray-800">No Blogs Found</h1>
        <div className="flex justify-center">
  <button
    onClick={() => navigate('/createBlog')}
    title=""
    className="whitespace-nowrap rounded-xl bg-blue-700 px-5 py-3 font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 hover:bg-blue-600 lg:block"
  >
    Create Blog
  </button>
</div>
</> : 
        <>
        <section className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="flex justify-center">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="mb-10 md:mb-16">
              <h2 className="mb-2 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
                {userName}'s Blogs
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
        <p className="mt-auto text-gray-600 text-sm flex items-center">
  {blog.profile_pic ? (
    <img src={blog.profile_pic} alt="" className="h-8 w-8 rounded-full mr-2" />
  ) : (
    <span class="inline-block size-[38px] bg-gray-100 rounded-full overflow-hidden">
  <svg class="size-full text-gray-300" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="white"/>
    <path d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z" fill="currentColor"/>
    <path d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z" fill="currentColor"/>
  </svg>
</span>
  )}
  {blog.written_by}
</p>


        <button
          onClick={() => navigate(`/myBlog/${blog.postId}`) }
          className="group mt-2 flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition"
        >
          <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold text-sm">
            View
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
        </>
    }
    </>
  );
};

export default Profile;
