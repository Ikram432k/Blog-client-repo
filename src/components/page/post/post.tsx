import axios from "axios";
import { Key, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./comment/comment";
import Form from "./commentForm/commentForm";
import './poststyle.scss';
const Post =()=>{
    const {id} = useParams();
    

    useEffect(()=>{
        postContainer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const[post,setPost] = useState<any[]>([])
    const postContainer =async()=>{
        try{
        //  console.log(id);   
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
        const data = response.data.post;
        let temp = [];
        temp.push(data);
        setPost(temp);
        }catch(err){
            return err;
        }
    }
    return(
        <div className="post">
            {post.map((obj,i)=>(
                <div className="content" key={i}>
                    <div className="post-content">
                    <h2>{obj.title}</h2>
                    <p className="post-bottom">{obj.text}</p>
                    </div>
                    {/* {obj.comments.map((ele: string,i: Key )=>(
                        <Comment key={i} commentId={ele}/>
                    ))} */}
                    <Form postId={obj._id}/>
                    <Comment postId={obj._id}/>
                </div>
            ))}
        </div>
    )
}

export default Post;