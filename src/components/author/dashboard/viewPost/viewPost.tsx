import axios from "axios";
import { useEffect, useState } from "react";
import '../viewPost/viewPostStyle.scss';

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
        const response = await axios.get(`http://localhost:3000/api/posts/${postid}`)
        const data = response.data.post;
        setPost(data);
        if(data.comments.length===0){
            return;
        }
        getcomment();
        }catch(err){
            return err;
        }
    }
    const[comments,setComments] =useState<any[]>([]);
    const[emptyMsg,setEmptyMsg] =useState<string>();
    const[empMsg,setEmpMsg] =useState<boolean>(false);
    useEffect(()=>{
        setEmpMsg(true);
    },[emptyMsg])
    const getcomment=async()=>{
        try{
            const response = await axios.get(`http://localhost:3000/api/posts/${postid}/postComments`);
            if (response.data.message){
                setEmptyMsg(response.data.message);
            } 
            const data = response.data;
            setComments([...data]);
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
            {/* <p><i className='far fa-comment'></i> {post.comments.length}</p> */}
            <p style={{display: empMsg ? 'block' : 'none' }}>{emptyMsg}</p>
            {comments.map((obj,i)=>(
                <div className="viewComment" key={i}>
                    <div>
                        <p className="name">{obj.name} says ,</p>
                        <p>"{obj.comment}"</p>
                    </div>
                    <div>
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