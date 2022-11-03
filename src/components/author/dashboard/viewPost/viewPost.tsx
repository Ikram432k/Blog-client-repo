import axios from "axios";
import { useEffect, useState } from "react";
import '../viewPost/viewPostStyle.scss';
// interface display{
//     displays:{    
//         show:boolean
//     };
//     id:{
//         onepostid:string
//     };
// }
interface display{
    show:boolean,
    onepostid:string
}
const ViewPost =({show,onepostid}:display)=>{
    axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.getItem('token')}`}
    useEffect(()=>{
        postContainer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const[post,setPost] = useState<any>([])
    const[newPost,setNewPost] = useState<object>({
        title:'',
        text:''
    })
    const handleChange=(e: any)=>{
        setPost({...post,[e.target.name]:e.target.value})
        console.log(post)
    }
    const submitForm =async()=>{
        try{
            const response = await axios.post(`http://localhost:3000/api/posts/${onepostid}/update`,post);
            console.log(response.data);
        }catch(err){
            return err
        }
    }
    const postContainer =async()=>{
        try{
        //  console.log(id);   
        const response = await axios.get(`http://localhost:3000/api/posts/${onepostid}`)
        const data = response.data.post;
        setPost(data);
        console.log(post);
        }catch(err){
            return err;
        }
    }

    useEffect(()=>{
        getcomment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    const[comments,setComments] =useState<any[]>([])
    const getcomment=async()=>{
        try{
            const response = await axios.get(`http://localhost:3000/api/posts/${onepostid}/postComments`);
            const data = response.data;
            setComments(data);
            // console.log(comments);
        }catch(err){
            return err;
        }
    }

    const deletePostComment=async(id: string)=>{
        try{
        const response = await axios.post(`http://localhost:3000/api/posts/${onepostid}/comment/${id}`);
        console.log(response);
        getcomment();
        }catch(err){
            return err;
        }
    }
    return (
        <div className="viewPost" style={{display: show ? 'block' : 'none' }}>
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
                <button onClick={submitForm}>submit</button>
            </form>
            <div className="postComment">
            <h3>Comments</h3>
            {comments.map((obj,i)=>(
                <div className="viewComment" key={i}>
                    <p className="name">{obj.name} says ,</p>
                    <p>"{obj.comment}"</p>
                    <div>
                                    {/* <i className='far fa-edit'></i> */}
                                    <button onClick={(e:any)=>deletePostComment(obj._id)}>
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