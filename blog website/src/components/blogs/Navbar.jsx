import React from "react";
import { Link } from "react-router-dom";
import { signOut} from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

function Navbar() {
    let navigate = useNavigate();
  const signOutUser = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <header className="text-slate-700 container relative mx-auto flex flex-col overflow-hidden px-4 py-4 lg:flex-row lg:items-center">
        <Link
          to="/dashboard"
          className="flex items-center whitespace-nowrap text-2xl font-black"
        >
          Thought Canvas
        </Link>
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="absolute top-5 right-5 cursor-pointer lg:hidden"
          htmlFor="navbar-open"
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
          <div className="my-4 items-center space-y-4 lg:my-0 lg:ml-auto lg:space-y-0 lg:flex lg:items-center lg:space-x-8">
            <Link
              to="/dashboard"
              title=""
              className="whitespace-nowrap rounded font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2 hover:text-opacity-50 lg:block mx-2"
            >
              My Blogs
            </Link>
            <Link
              to="/recentBlogs"
              title=""
              className="whitespace-nowrap rounded font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2 hover:text-opacity-50 lg:block mx-2"
            >
              Recent Blogs
            </Link>
            <Link
              to="/createBlog"
              title=""
              className="whitespace-nowrap rounded font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2 hover:text-opacity-50 lg:block"
            >
              Create Blogs
            </Link>
            <button
              onClick={signOutUser}
              title=""
              className="whitespace-nowrap rounded-xl bg-blue-700 px-5 py-3 font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 hover:bg-blue-600 lg:block"
            >
              LogOut
            </button>
          </div>
        </nav>
      </header>
      <hr />
    </>
  );
}

export default Navbar;
