import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useParams } from "react-router-dom";
import '../dashboard/dashBoardStyle.scss';

const Dashboard =()=>{

//     interface userDetails {
//     username: string,
//     _id: string,
//     posts: Array<string>
// }

useEffect(()=>{
    setUserDetails();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

const[lsUser,setUser] =useState({
    posts:[],
    username:'',
    _id:''
});
useEffect(()=>{
    getPost();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[lsUser]);

const[userToken,setToken] =useState<string>('');

const[allPosts,setAllPost] = useState<any[]>([]); 

    const setUserDetails=()=>{
        const currentUser = JSON.parse(localStorage.getItem('user')! );
        const token = localStorage.getItem('token')!;
        setUser(currentUser);
        setToken(token);
        console.log(lsUser,userToken);
    }

    const deletePost=async(id: string)=>{
        try{
        const response = await axios.post(`http://localhost:3000/api/posts/${id}/delete`,{
            headers: {
              'Authorization': userToken
            }
          });
        console.log(response);
        }catch(err){
            return err;
        }
    }


    const getPost =async()=>{
        const arr = lsUser.posts;
        const l = arr.length
        for(let i=0;i<l;i++){
            try{
                const response = await axios.get(`http://localhost:3000/api/posts/${arr[i]}`);
                console.log(response.data.post);
                let temp = allPosts;
                temp.push(response.data.post);
                setAllPost([...temp])
                console.log(allPosts);
                }catch(err){
                    return err;
                }
        }
    }

    return(
        <div className="dashContent">
            <div className='dashContainer'>
                <div className="dashHead">
                    <h2>User : {lsUser.username}</h2>
                    <p>Total number of posts : {lsUser.posts.length}</p>
                </div>
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
                            <Link to=''>
                                <button>
                                    view Post
                                </button>  
                            </Link>
                        </div>
                </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Dashboard;