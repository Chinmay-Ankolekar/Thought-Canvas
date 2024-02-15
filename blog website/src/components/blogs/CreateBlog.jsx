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
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const BlogCollectionRef = collection(db, "blog");

  

  const onSubmit = async () => {
    try {
      if (image) {
        const reader = new FileReader();
        reader.onload = async () => {
          const dataURL = reader.result;
          const storageRef = ref(storage, `images/${image.name}`);
          await uploadString(storageRef, dataURL, "data_url");
          const url = await getDownloadURL(storageRef);
          setImageUrl(url);

          const docRef = await addDoc(BlogCollectionRef, {
            name: title,
            description: description,
            category: category,
            created_at: new Date().toLocaleString(),
            userId: user.auth.currentUser.uid,
            imageUrl: url,
            written_by: user.auth.currentUser.displayName,
            profile_pic: user.auth.currentUser.photoURL,
          });
          const postId = docRef.id;
          await updateDoc(docRef, { postId: postId });

          window.location.reload();
          alert("Blog Created");
        };
        reader.readAsDataURL(image);
      }
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
            <img
              className="mr-5 h-12 w-12 rounded-full"
              src={profile_url}
              alt=""
            />
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
                  Post Comment
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


     