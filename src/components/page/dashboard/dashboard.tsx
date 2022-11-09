import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../dashboard/dashBoardStyle.scss';
import ViewPost from './viewPost/viewPost';
import moment from 'moment';
const Dashboard =()=>{
    const {userid,username} = useParams();
useEffect(()=>{   
    setUserDetails();
    getPost();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
const[userToken,setToken] =useState<string>('');
const[allPosts,setAllPost] = useState<Array<{ _id: string, title: string ,comments: Array<[]>,timestamp: Date}>>([]); 
const[post,setPost] = useState<any>([])
    const handleChange=(e: any)=>{
        setPost({...post,[e.target.name]:e.target.value})
        console.log(post)
    }
    const validation = () => {
        const { title, text } = post;
        if (!title || !text) {
            alert('please make sure fill all the fields')
            return false;
        }
        return true;
    }
    const submitForm =async()=>{
        if (validation()){
            try{
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const response = await axios.post(`http://localhost:3000/api/posts/createpost`,post);
                getPost();
            }catch(err){
                return err
            }
        }
    }
    const setUserDetails=()=>{
        const token = localStorage.getItem('token')!;
        setToken(token);
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
    const displayNone=(e: any)=>{
        e.preventDefault();
        setShow(false);
    }
    const formattime=(time:Date)=>{
        return moment(time).format('MMMM Do YYYY, h:mm:ss a');
    }
    return(
        <div className="dashContent">
            <div className='dashContainer' >
                <div className="dashHead">
                    <h2>User : {username}</h2>
                    <div className='dashHead-info'>
                        <p>Total number of posts : {allPosts.length}</p>
                        <button className="head-btn" onClick={setViewPost}>
                            <i className="fa fa-plus"></i> New Blog
                        </button>              
                    </div>
                </div>
                <form className="newblog-form" style={{display: show ? 'block' : 'none' }}>
                    <div className='b-form-inputs'>
                        <label htmlFor='title'>Title of the Blog :</label>
                        <textarea
                        className="newblog-title"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        />
                    </div>
                    <div className='b-form-inputs'>
                        <label htmlFor='text'>Body of the Blog :</label>
                        <textarea
                        className="newblog-text"
                        name="text"
                        value={post.text}
                        onChange={handleChange}
                        />
                    </div>
                    <div className='form-btn'>
                        <button className='head-btn' onClick={submitForm}>submit</button>
                        <button className='head-btn' onClick={displayNone}>Cancel</button>
                    </div>
                </form>
                <div className="dashMain">
                    {allPosts.map((obj,i)=>(
                        <div className='dashCard-in' key={i}>
                            <div className='dashCard'>
                                <div className='cardtitle'>
                                    <h3>Title : {obj.title}</h3>
                                    <p>Lastly Updated on {formattime(obj.timestamp)}</p>
                                </div>
                                <div>
                                    <button className="post-trash"onClick={(e:any)=>deletePost(obj._id)}>
                                        <i className='fas fa-trash'></i>
                                    </button>
                                </div>
                            </div>
                            <ViewPost postid={obj._id}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Dashboard;