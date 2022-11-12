import axios from "axios";
import { useEffect, useState } from "react";
import './commentStyle.scss';
import '../commentForm/formstyle.scss';
import moment from "moment";

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
    const[comments,setComments] = useState<Array<{ _id: string, name: string ,comment: string,date: Date}>>([]);
    const getcomment=async()=>{
        try{
            const response = await axios.get(`https://web-production-9701.up.railway.app/api/posts/${postId}/postComments`);
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await axios.post(`https://web-production-9701.up.railway.app/api/posts/${postId}/comment`,commentData);
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
    const formattime=(time:Date)=>{
        return moment(time).format('MMMM Do YYYY, h:mm:ss a');
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
                        <p className="name">"{obj.comment}"</p>
                        <p>Posted on {formattime(obj.date)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Comment;