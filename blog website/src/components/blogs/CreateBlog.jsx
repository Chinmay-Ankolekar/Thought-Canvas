import { useState } from "react";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";

const CreateBlog = ({ user }) => {
    let navigate = useNavigate();
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
          
          // Add blog post to Firestore
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
          alert('Blog Created')
          
        };
        reader.readAsDataURL(image);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <label>Title</label>
      <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <br />
      <label>Description</label>
      <br />
      <textarea
        rows={10}
        cols={50}
        placeholder="Enter description..."
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <label>Category</label>
      <input type="text" onChange={(e) => setCategory(e.target.value)} />
      <br />
      <label>Image</label>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <br />
      <button onClick={onSubmit}>Create</button>
      <br />
      <button className="border">
        <Link to="/dashboard">Back Homepage</Link>
      </button>
    </div>
  );
};

export default CreateBlog;



