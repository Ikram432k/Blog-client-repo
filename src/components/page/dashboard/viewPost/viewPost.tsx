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
    const[commentData,setData] = useState({
        name:'',
        comment:''
    })
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
    // const[emptyMsg,setEmptyMsg] =useState<string>();
    // const[empMsg,setEmpMsg] =useState<boolean>(false);
    // useEffect(()=>{
    //     setEmpMsg(true);
    //     // console.log(emptyMsg)
    // },[emptyMsg]);

    const getcomment=async()=>{
        try{
            const response = await axios.get(`http://localhost:3000/api/posts/${postid}/postComments`);
            const data = response.data;
            // if(response.data.message){
            //     console.log(response.data.message);
            //     // setEmptyMsg(response.data.message);
            // } 
            setComments([...data]);
        }catch(err){
            return err;
        }
    }
    const deletePostComment=async(commentid: string)=>{
        try{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await axios.post(`http://localhost:3000/api/posts/${postid}/comment/${commentid}`);
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
    const handleComentChange =(e: any)=>{
        setData({...commentData,[e.target.name]:e.target.value})
    }
    const submitCommentForm =async (e:any)=>{
        e.preventDefault();
        try{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await axios.post(`http://localhost:3000/api/posts/${postid}/comment`,commentData);
        getcomment();
        closeForm();
        }catch(err){
            return err;
        }
    }
    const closeForm =()=>{
        setData({
            name:'',
            comment:''
        })
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
            {/* <p style={{display: empMsg ? 'block' : 'none' }}>{emptyMsg}</p> */}
            <form className="commentForm">
                <p>Add new comment</p>
                <div className="field">
                <input
                className="input"
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleComentChange}
                value={commentData.name}
                />
                <textarea
                className="input"
                name="comment"
                placeholder="Enter your comment"
                onChange={handleComentChange}
                value={commentData.comment}
                />
                </div>
                <button onClick={submitCommentForm}>comment</button>
            </form>
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