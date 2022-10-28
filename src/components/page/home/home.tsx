// import { Link} from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Main,Div} from './homeStyle';


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
        <div>
            <div>
                <p>
                    Post your own views and perspectives as blog by signing up <Link to="">here</Link>.
                </p>
            </div>
            <Main>
                {post.map((obj,i)=>(
                    <Div key={i}>
                        <h3>{obj.title}</h3>
                        <p>{obj.author.username}</p>
                        <Link to={`/post/${obj._id}`}>
                            <button>view post</button>
                        </Link>
                    </Div>
                ))}
            </Main>
        </div>
    )
}
export default Home;