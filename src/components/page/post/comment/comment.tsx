import axios from "axios";
import { useEffect, useState } from "react";
import './commentStyle.scss';

interface link{
    postId:string
}
const Comment =({postId}:link)=>{
    useEffect(()=>{
        getcomment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    const[comments,setComments] =useState<any[]>([])
    const getcomment=async(id=postId)=>{
        try{
            const response = await axios.get(`http://localhost:3000/api/posts/${postId}/postComments`);
            const data = response.data;
            setComments(data);
            console.log(comments);
        }catch(err){
            return err;
        }
        
    }
    return(
        <div className="comment">
            <h3>Comments</h3>
            {comments.map((obj,i)=>(
                <div className="contentCom" key={i}>
                    <p>{obj.name}</p>
                    <p>{obj.comment}</p>
                </div>
            ))}
        </div>
    )
}
export default Comment;