import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Post =()=>{
    const {id} = useParams();
    

    useEffect(()=>{
        postContainer();
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
        <div>
            {post.map((obj,i)=>(
                <div key={i}>
                    <h2>{obj.title}</h2>
                    <p>{obj.text}</p>
                </div>
            ))}
        </div>
    )
}

export default Post;