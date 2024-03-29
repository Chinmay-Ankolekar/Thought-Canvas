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
      console.log(blog);
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
              Get Started
            </Link>
          </div>
        </nav>
      </header>
      <hr />

      {blogs.length === 0 ? (
        <h1 className="text-center mb-4 text-2xl font-bold text-gray-800">
          No Blogs Found
        </h1>
      ) : (
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

              {blogs
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((blog, index) => (
                  <div
                    key={index}
                    className="m-10 mx-4 max-w-screen-lg overflow-hidden rounded-xl border shadow-lg md:pl-8"
                  >
                    <div className="flex flex-col overflow-hidden bg-white sm:flex-row md:h-64">
                      <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
                        <Link
                          to="/login"
                          className="text-lg md:text-md font-bold text-gray-900 lg:text-xl"
                        >
                          {blog.name}
                        </Link>
                        <p className="mt-4 mb-2 max-w-md text-gray-500">
                          {blog.description.split(" ").slice(0, 20).join(" ")}
                          {blog.description.split(" ").length > 50 ? "..." : ""}
                        </p>
                        <Link to='/login' className="mt-auto text-gray-600 text-sm flex items-center">
                          {blog.profile_pic ? (
                            <img
                              src={blog.profile_pic}
                              alt=""
                              className="h-8 w-8 rounded-full mr-2"
                            />
                          ) : (
                            <span class="inline-block size-[38px] bg-gray-100 rounded-full overflow-hidden">
                              <svg
                                class="size-full text-gray-300"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="0.62854"
                                  y="0.359985"
                                  width="15"
                                  height="15"
                                  rx="7.5"
                                  fill="white"
                                />
                                <path
                                  d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          )}
                          {blog.written_by}
                        </Link>

                        <button
                          onClick={() => navigate(`/login`)}
                          className="group mt-2 flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition"
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
      )}
    </>
  );
};

export default Homepage;
