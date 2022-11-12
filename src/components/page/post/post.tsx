import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./comment/comment";
import './poststyle.scss';
const Post =()=>{
    const {id} = useParams();
    

    useEffect(()=>{
        postContainer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const[post,setPost] = useState<Array<{ _id: string, title: string ,text: string, author: {username:string},timestamp: Date}>>([]);
    const postContainer =async()=>{
        try{
        const response = await axios.get(`https://web-production-9701.up.railway.app/api/posts/${id}`);
        const data = response.data.post;
        let temp = [];
        temp.push(data);
        setPost(temp);
        }catch(err){
            return err;
        }
    }
    const formattime=(time:Date)=>{
        return moment(time).format('MMMM Do YYYY, h:mm:ss a');
    }
    return(
        <div className="post">
            {post.map((obj,i)=>(
                <div className="content" key={i}>
                    <div className="post-content">
                        <h2>{obj.title}</h2>
                        <p className="post-bottom">{obj.text}</p>
                        <div className="userDate">
                            <p>Author: {obj.author.username}</p>
                            <p>{formattime(obj.timestamp)}</p>
                        </div>
                    </div>
                    <Comment postId={obj._id}/>
                </div>
            ))}
        </div>
    )
}

export default Post;