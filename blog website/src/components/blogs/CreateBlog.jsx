import { useState } from "react";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const CreateBlog = ({ user }) => {
  let navigate = useNavigate();
  const profile_url = user.auth.currentUser.photoURL;
  const [title, setTitle] = useState("");
  const [sub_title, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const BlogCollectionRef = collection(db, "blog");

  

  const onSubmit = async () => {
    try {
        if (!title || !sub_title || !description || !category || !image) {
            alert("Please fill in all fields.");
            return;
        }

        const reader = new FileReader();
        reader.onload = async () => {
            const dataURL = reader.result;
            const storageRef = ref(storage, `images/${image.name}`);
            await uploadString(storageRef, dataURL, "data_url");
            const url = await getDownloadURL(storageRef);
            setImageUrl(url);

            const docRef = await addDoc(BlogCollectionRef, {
                name: title,
                sub_title: sub_title,
                description: description,
                category: category,
                created_at: new Date().toLocaleString(),
                userId: user.auth.currentUser.uid,
                imageUrl: url,
                written_by: user.auth.currentUser.displayName,
                profile_pic: user.auth.currentUser.photoURL,
                joining_date: user.metadata.creationTime,
                email: user.auth.currentUser.email,
            });
            const postId = docRef.id;
            await updateDoc(docRef, { postId: postId });

            window.location.reload();
            alert("Blog Created");
        };
        reader.readAsDataURL(image);
    } catch (error) {
        alert(error.message);
    }
};


  return (
    <>
      <Navbar />

      <div className="">
        <div className="mx-auto max-w-screen-sm px-4">
          <h1 className="mt-6 text-xl font-bold sm:mb-6 sm:text-3xl">
            Create Blog
          </h1>

          <div className="-ml-20 flex p-4 text-left text-gray-700">
            {
              profile_url ? (
                <img
                  className="mr-5 h-12 w-12 rounded-full"
                  src={profile_url}
                  alt=""
                />
              ) : (
                <span class="inline-block size-[46px] bg-gray-100 rounded-full overflow-hidden">
  <svg class="size-full text-gray-300" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="white"/>
    <path d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z" fill="currentColor"/>
    <path d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z" fill="currentColor"/>
  </svg>
</span>
              )
            }
            {/* <img
              className="mr-5 h-12 w-12 rounded-full"
              src={profile_url}
              alt=""
            /> */}
            <div className="w-full space-y-3 text-gray-700">
              <div className="">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Enter Blog Title"
                  className="h-12 w-full max-w-full rounded-md border bg-white px-5 text-sm outline-none focus:ring"
                />
              </div>
              <div className="">
                <input
                  onChange={(e) => setSubTitle(e.target.value)}
                  type="text"
                  placeholder="Enter Sub Title"
                  className="h-12 w-full max-w-full rounded-md border bg-white px-5 text-sm outline-none focus:ring"
                />
              </div>
              <div className="">
                <input
                  type="text"
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter Blog category"
                  className="h-12 w-full max-w-full rounded-md border bg-white px-5 text-sm outline-none focus:ring"
                />
              </div>
              <div className="">
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  name="comment"
                  id=""
                  placeholder="Write your blog here..."
                  cols="30"
                  rows="6"
                  className="h-40 w-full min-w-full max-w-full overflow-auto whitespace-pre-wrap rounded-md border bg-white p-5 text-sm font-normal normal-case text-gray-600 opacity-100 outline-none focus:text-gray-600 focus:opacity-100 focus:ring"
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="file-upload" className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-blue-700 text-white cursor-pointer">
                  Upload Image
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <button onClick={onSubmit} className="relative inline-flex h-10 w-auto max-w-full cursor-pointer items-center justify-center overflow-hidden whitespace-pre rounded-md bg-blue-700 px-4 text-center text-sm font-medium normal-case text-white opacity-100 outline-none focus:ring">
                  Post Blog
                </button>
              </div>
              <div>
                <Link to="/dashboard" className="text-blue-700 hover:underline">Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;


     