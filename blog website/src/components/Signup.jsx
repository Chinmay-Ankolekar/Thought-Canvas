import { useState } from "react";
import { auth, GoogleProvider } from "../config/firebase";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

const Signup = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      alert("User Created");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, GoogleProvider);
        navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div class="flex flex-wrap">
        <div class="flex w-full flex-col md:w-1/2">
          <div class="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
            <a
              href="#"
              class="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900 lg:mb-20"
            >
              {" "}
              Thought Canvas .{" "}
            </a>
          </div>
          <div class="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
            <p class="text-left text-3xl font-bold">Welcome,</p>
            <p class="mt-2 text-left text-gray-500">
              Create an account to get started.
            </p>
            <button
              onClick={signInWithGoogle}
              class="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white"
            >
              <img
                class="mr-2 h-5"
                src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
                alt
              />{" "}
              Log in with Google
            </button>
            <div class="relative mt-8 flex h-px place-items-center bg-gray-200">
              <div class="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">
                or
              </div>
            </div>
            <div class="flex flex-col pt-3 md:pt-8">
              <div class="flex flex-col pt-4">
                <div class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <input
                    type="text"
                    id="login-email"
                    class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div class="flex flex-col pt-4">
                <div class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <input
                    type="email"
                    id="login-email"
                    class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div class="mb-12 flex flex-col pt-4">
                <div class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <input
                    type="password"
                    id="login-password"
                    class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                onClick={signIn}
                type="submit"
                class="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
              >
                Log in
              </button>
            </div>
            <div class="py-12 text-center">
              <p class="whitespace-nowrap text-gray-600">
                Already have an account?
                <Link
                  to="/login"
                  class="underline-offset-4 font-semibold text-gray-900 underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div class="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
          <div class="absolute bottom-0 z-10 px-8 text-white opacity-100">
            <p class="mb-8 text-3xl font-semibold leading-10">
              I never get complacent because I'm always learning. The minute I
              think I'm good at something, that's the day I stop trying to be
              better.
            </p>
            <p class="mb-4 text-3xl font-semibold">Virat Kohli</p>
            <p class=""> Batter</p>
            <p class="mb-7 text-sm opacity-70">Indian Cricket Team</p>
          </div>
          <img
            class="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
            src="https://images.unsplash.com/photo-1565301660306-29e08751cc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=divat&fit=crop&w=687&q=80"
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
