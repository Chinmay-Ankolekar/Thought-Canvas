import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";

const Homepage = () => {
    let navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const BlogCollectionRef = collection(db, "blog");

  const getBlogs = async () => {
    try {
      const querySnapshot = await getDocs(BlogCollectionRef);
      const blog = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setBlogs(blog);
    } catch (error) {
      console.error("Error getting blogs: ", error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <header className="text-slate-700 container relative mx-auto flex flex-col overflow-hidden px-4 py-4 lg:flex-row lg:items-center">
        <Link
          to="/"
          className="flex items-center whitespace-nowrap text-2xl font-black"
        >
          Thought Canvas
        </Link>
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="absolute top-5 right-5 cursor-pointer lg:hidden"
          for="navbar-open"
        >
          <svg
            className="h-7 w-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <nav
          aria-label="Header Navigation"
          className="peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row"
        >
          <hr className="mt-4 w-full lg:hidden" />
          <div className="my-4 flex items-center space-x-6 space-y-2 lg:my-0 lg:ml-auto lg:space-x-8 lg:space-y-0">
            <Link
              to="/login"
              title=""
              className="whitespace-nowrap rounded font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2 hover:text-opacity-50"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              title=""
              className="whitespace-nowrap rounded-xl bg-blue-700 px-5 py-3 font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 hover:bg-blue-600"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>
      <hr />

      {
        blogs.length === 0 ? <h1 className="text-center mb-4 text-2xl font-bold text-gray-800">No Blogs Found</h1> :

        <section className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="flex justify-center">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="mb-10 md:mb-16">
              <h2 className="mb-2 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
                Most Recent Posts
              </h2>

              <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                Discover our newest post! Read about the latest topics, tips,
                and trends.
              </p>
            </div>

            {blogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((blog, index) => (
  <div
    key={index}
    className="m-10 mx-4 max-w-screen-lg overflow-hidden rounded-xl border shadow-lg md:pl-8"
  >
    <div className="flex flex-col overflow-hidden bg-white sm:flex-row md:h-64">
      <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
        <Link to='/login' className="text-lg md:text-md font-bold text-gray-900 lg:text-xl">
          {blog.name}
        </Link>
        <p className="mt-4 mb-8 max-w-md text-gray-500">
          {blog.description.split(" ").slice(0, 20).join(" ")}
          {blog.description.split(" ").length > 50 ? "..." : ""}
        </p>
        <button
  onClick={() => navigate(`/myBlog/${blog.postId}`)}
  className="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition"
>
  <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold text-sm">
    Read More
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
      }

     
    </>
  );
};

export default Homepage;
