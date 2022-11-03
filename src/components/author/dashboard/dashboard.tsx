import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { useParams } from "react-router-dom";
import '../dashboard/dashBoardStyle.scss';
import ViewPost from './viewPost/viewPost';

const Dashboard =()=>{

    const {userid,username} = useParams();

useEffect(()=>{        // const currentUser = JSON.parse(localStorage.getItem('user')! );

    setUserDetails();
    getPost();

// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

const[userToken,setToken] =useState<string>('');

const[allPosts,setAllPost] = useState<any[]>([]); 

const[post,setPost] = useState<any>([])
    const handleChange=(e: any)=>{
        setPost({...post,[e.target.name]:e.target.value})
        console.log(post)
    }
    const submitForm =async()=>{
        try{
            const response = await axios.post(`http://localhost:3000/api/posts/createpost`,post);
            getPost();
            console.log(response.data);
        }catch(err){
            return err
        }
    }
    const setUserDetails=()=>{
        // const currentUser = JSON.parse(localStorage.getItem('user')! );
        const token = localStorage.getItem('token')!;
        setToken(token);
        console.log(userToken);
    }

    const deletePost=async(id: string)=>{
        try{
            axios.defaults.headers.common = {'Authorization': `bearer ${userToken}`}

        const response = await axios.post(`http://localhost:3000/api/posts/${id}/delete`);
        console.log(response);
        getPost();
        }catch(err){
            return err;
        }
    }


    const getPost =async()=>{
            try{
                const response = await axios.get(`http://localhost:3000/api/posts/${userid}/userposts`);
                const data = response.data.posts;
                setAllPost(data);
                }catch(err){
                    return err;
                }
    }
    const[show,setShow] =useState<boolean>(false);
    const setViewPost=()=>{
        setShow(true);
    }
    return(
        <div className="dashContent">

            <div className='dashContainer' >
                <div className="dashHead">
                    <h2>User : {username}</h2>
                    <p>Total number of posts : {allPosts.length}</p>
                </div>
                <form>
                    <input
                    type='text'
                    className="title"
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
                <div className="dashMain">
                    {allPosts.map((obj,i)=>(
                        <div className='dashCard-in' key={i}>
                            <div className='dashCard'>
                                <div className='cardtitle'>
                                    <h3>Title : {obj.title}</h3>
                                    <p><i className='far fa-comment'></i> {obj.comments.length}</p>
                                </div>
                                <div>
                                    {/* <i className='far fa-edit'></i> */}
                                    <button onClick={(e:any)=>deletePost(obj._id)}>
                                        <i className='fas fa-trash'></i>
                                    </button>
                                </div>
                            </div>
                            <div className='dashbtn'>
                                    <button onClick={setViewPost}>
                                        view Post
                                    </button>  
                            </div>
                            <ViewPost show={show} postid={obj._id}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Dashboard;

// ,{
//     headers: {
//       'Authorization': userToken
//     }
//   }