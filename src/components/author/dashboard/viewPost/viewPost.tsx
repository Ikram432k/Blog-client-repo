import axios from "axios";
import { useEffect, useState } from "react";
import '../viewPost/viewPostStyle.scss';
// interface param{shows:{
//     show:boolean
// };

// } 
interface id{
    postid:string
}
const ViewPost =({postid}:id)=>{
    axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.getItem('token')}`}
    useEffect(()=>{
        postContainer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const[post,setPost] = useState<any>([])
    const handleChange=(e: any)=>{
        setPost({...post,[e.target.name]:e.target.value})
        setViewPost();
        console.log(post)
    }
    const submitForm =async()=>{
        try{
            const response = await axios.post(`http://localhost:3000/api/posts/${postid}/update`,post);
            console.log(response.data);
        }catch(err){
            return err
        }
    }
    const postContainer =async()=>{
        try{
        //  console.log(id);   
        const response = await axios.get(`http://localhost:3000/api/posts/${postid}`)
        const data = response.data.post;
        setPost(data);
        if(data.comments.length===0){
            return;
        }
        getcomment();
        console.log(post);
        }catch(err){
            return err;
        }
    }

    // useEffect(()=>{
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[]);
    const[comments,setComments] =useState<any[]>([])
    const getcomment=async()=>{
        try{
            const response = await axios.get(`http://localhost:3000/api/posts/${postid}/postComments`);
            // if (!response) 
            const data = response.data;
            setComments(data);
            // console.log(comments);
        }catch(err){
            return err;
        }
    }

    const deletePostComment=async(commentid: string)=>{
        try{
        const response = await axios.post(`http://localhost:3000/api/posts/${postid}/comment/${commentid}`);
        console.log(response);
        getcomment();
        }catch(err){
            return err;
        }
    }
    const[show,setShow] =useState<boolean>(false);
    const setViewPost=()=>{
        setShow(true);
    }
    const closeBtn=(e :any)=>{
        e.preventDefault();
        setShow(false);
    }
    return (
        <div className="viewPost" >
            <form className="showPost">
                <textarea
                className="titlearea"
                name="title"
                value={post.title}
                onChange={handleChange}
                />
                <textarea
                className="textarea"
                name="text"
                value={post.text}
                onChange={handleChange}
                />
                <div className="edit-post-btn" style={{display: show ? 'flex' : 'none' }}>
                    <button onClick={submitForm}>save</button>
                    <button onClick={closeBtn}>cancel</button>
                </div>
            </form>
            <div className="postComment">
            <h3>Comments</h3>
            {comments.map((obj,i)=>(
                <div className="viewComment" key={i}>
                    <div>
                        <p className="name">{obj.name} says ,</p>
                        <p>"{obj.comment}"</p>
                    </div>
                    <div>
                        {/* <i className='far fa-edit'></i> */}
                        <button className="comment-trash" onClick={(e:any)=>deletePostComment(obj._id)}>
                            <i className='fas fa-trash'></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
        </div>
    )
}
export default ViewPost;