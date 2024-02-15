import { useState, useEffect } from 'react';
import {auth, db} from '../../config/firebase'
import { collection, doc, getDocs, query, where, addDoc } from 'firebase/firestore'

const Comments = ({postId}) => {
    const userId = auth.currentUser.uid
    console.log(postId, userId);
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
    }

    const getComments = async () => {
        try {
            const querySnapshot = await getDocs(query(CommentsCollectionRef, where("postId", "==", postId)));
            const comments = querySnapshot.docs.map((doc) => ({
                ...doc.data()
            }))
            setComments(comments);
           
        } catch (error) {
            console.error("Error getting comments: ", error);
        }
    }

    useEffect(()=> {
        getComments();
    },[])
    
    return (
        <div>
            <h1>Comments</h1>
           {
                comments.map((comment,index) => {
                     return(
                          <div key={index}>
                            <p>{comment.comment}</p>
                            <p className="flex items-center">
                                 <img src={comment.profile_pic} alt="" width="20" className="rounded-full mr-2" />
                                 <span className="text-gray-600">Written by: {comment.written_by}</span>
                            </p>
                            <p>Time:{comment.commented_at}</p>
                          </div>
                     )
                })
              }
               
                <br />
            <input type="text" onChange={(e)=> setComment(e.target.value)} className='border'/>
            <br />
            <button onClick={onSubmit}>Add Comment</button>
        </div>
    )
}

export default Comments