import axios from "axios";
import { useEffect, useState } from "react";
import './commentStyle.scss';
import '../commentForm/formstyle.scss';

interface link{
    postId:string
}
const Comment =({postId}:link)=>{
    const[commentData,setData] = useState({
        name:'',
        comment:''
    })
    useEffect(()=>{
        getcomment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[commentData]);
    const[comments,setComments] =useState<any[]>([])
    const getcomment=async(id=postId)=>{
        try{
            const response = await axios.get(`http://localhost:3000/api/posts/${postId}/postComments`);
            const data = response.data;
            setComments([...data]);
        }catch(err){
            return err;
        }
        
    }
    const handleChange =(e: any)=>{
        setData({...commentData,[e.target.name]:e.target.value})
    }
    const submitForm =async (e:any)=>{
        e.preventDefault();
        try{
        const response = await axios.post(`http://localhost:3000/api/posts/${postId}/comment`,commentData);
        console.log(response.data);
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
    return(
        <div className="comment">
            <form className="commentForm">
                <p>your comment will be public</p>
                <div className="field">
                <input
                className="input"
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                value={commentData.name}
                />
                <textarea
                className="input"
                name="comment"
                placeholder="Enter your comment"
                onChange={handleChange}
                value={commentData.comment}
                />
                </div>
                <button onClick={submitForm}>comment</button>
            </form>
            <div className="cmt-div">
                <h3>Comments</h3>
                {comments.map((obj,i)=>(
                    <div className="contentCom" key={i}>
                        <p className="name">{obj.name} says ,</p>
                        <p>"{obj.comment}"</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Comment;