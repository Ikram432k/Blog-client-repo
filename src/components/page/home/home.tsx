// import { Link} from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import   './homeStyle.scss';

interface userName{
    user:string
}
const Home =(user:userName)=>{
    // const[visibleP,setVisible]=useState<boolean>(true)
    useEffect(()=>{
        getPost();
    },[]);
    const [post,setPost] = useState<any[]>([])
    const getPost =async()=>{
        try{
        const response = await axios.get('https://web-production-9701.up.railway.app/api/posts');
        const posts = response.data.posts;
        setPost(posts);
        }catch(err){
            return err;
        }
    }
    return(
        <div className="posts">
            <div className="top" >
                <p>
                    Post your own views and perspectives as blog by signing up <Link to='/signup'>signing up <i className='fas fa-sign-in-alt'></i></Link> or <Link to='/login'>loging in <i className='fas fa-sign-in-alt'></i></Link>.
                </p>
            </div>
            <div className="main">
                {post.map((obj,i)=>(
                    <div className="div" key={i}>
                        <h3>{obj.title}</h3>
                        <p>posted by- {obj.author.username}</p>
                        <p className="cmticon"><span className="material-symbols-outlined">comment</span>{obj.comments.length}</p>

                        <Link to={`/post/${obj._id}`}>
                            <button className="btn">view post</button>
                        </Link>
                        
                    </div>

                ))}
            </div>
        </div>
    )
}
export default Home;