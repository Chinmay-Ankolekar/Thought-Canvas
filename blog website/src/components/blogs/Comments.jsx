import { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';

const Comments = ({ postId }) => {
    const userId = auth.currentUser.uid;
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const CommentsCollectionRef = collection(db, "comments");

    const onSubmit = async () => {
        try {
            await addDoc(CommentsCollectionRef, {
                postId: postId,
                userId: userId,
                comment: comment,
                profile_pic: auth.currentUser.photoURL,
                written_by: auth.currentUser.displayName,
                commented_at: new Date().toLocaleString()
            });
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    };

    const getComments = async () => {
        try {
            const querySnapshot = await getDocs(query(CommentsCollectionRef, where("postId", "==", postId)));
            const comments = querySnapshot.docs.map((doc) => ({
                ...doc.data()
            }));
            setComments(comments);
        } catch (error) {
            console.error("Error getting comments: ", error);
        }
    };

    useEffect(() => {
        getComments();
    }, []);

    return (
        <div className="max-w-lg mx-auto">
        <h1 className="text-xl font-bold mt-8 mb-4">Comments</h1>
        {
            comments.map((comment,index) => {
                return(
                    <div key={index} className="border rounded-lg p-4 mb-4">
                        <p>{comment.comment}</p>
                        <p className="flex items-center">
                            <img src={comment.profile_pic} alt="" width="20" className="rounded-full mr-2" />
                            <span className="text-gray-600">Written by: {comment.written_by}</span>
                        </p>
                        <p>Time: {comment.commented_at}</p>
                    </div>
                )
            })
        }
           
        <div className="mt-4 flex items-start border-t border-gray-300 sm:p-8 py-4 text-left text-gray-700">
            <textarea
                cols="1"
                rows="1"
                onChange={(e)=> setComment(e.target.value)}
                placeholder="Your Comment"
                className="mr-4 overflow-hidden flex-1 cursor-text resize-none rounded-md bg-white text-sm py-2 sm:py-0 font-normal text-gray-600 opacity-70 shadow-none outline-none focus:text-gray-600 focus:opacity-100"
            ></textarea>
            <button onClick={onSubmit} className="relative inline-flex h-10 w-auto flex-initial cursor-pointer items-center justify-center self-center rounded-md bg-blue-700 px-6 text-center align-middle text-sm font-medium text-white outline-none focus:ring-2">
                Add Comment
            </button>
        </div>
    </div>
    );
};

export default Comments;
