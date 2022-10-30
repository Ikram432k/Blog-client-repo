// import { Link} from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import   './homeStyle.scss';


const Home =()=>{
    useEffect(()=>{
        getPost();
    },[]);
    const [post,setPost] = useState<any[]>([])
    const getPost =async()=>{
        try{
        const response = await axios.get('http://localhost:3000/api/posts');
        const posts = response.data.posts;
        setPost(posts);
        console.log(posts);
        }catch(err){
            return err;
        }
    }
    return(
        <div className="posts">
            <div className="top">
                <p>
                    Post your own views and perspectives as blog by signing up <Link to="">here</Link>.
                </p>
            </div>
            <div className="main">
                {post.map((obj,i)=>(
                    <div className="div" key={i}>
                        <h3>{obj.title}</h3>
                        <p>posted by- {obj.author.username}</p>
                        <p><i className='far fa-comment'></i>{obj.comments.length}</p>
                        
                        <Link to={`/post/${obj._id}`}>
                            <button>view post</button>
                        </Link>
                    </div>

                ))}
            </div>
        </div>
    )
}
export default Home;