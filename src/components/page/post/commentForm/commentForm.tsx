import axios from "axios";
import { useState } from "react";
import './formstyle.scss';
interface link{
    postId:string
}
const Form=({postId}:link)=>{
    const[commentData,setData] = useState({
        name:'',
        comment:''
    })
    const handleChange =(e: any)=>{
        setData({...commentData,[e.target.name]:e.target.value})
    }
    const submitForm =async ()=>{
        try{
        const response = await axios.post(`http://localhost:3000/api/posts/${postId}/comment`,commentData);
        console.log(response.data);
        closeForm();
        }catch(err){
            return err;
        }
    }
    const closeForm =()=>{
        setData({
            name:'',
            comment:''
        })
    }
    return(
        <div className="formdiv">
            <form className="commentForm">
                <p>your comment will be public</p>
                <div className="field">
                <input
                className="input"
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                />
                <textarea
                className="input"
                name="comment"
                placeholder="Enter your comment"
                onChange={handleChange}
                />
                </div>
                <button onClick={submitForm}>save</button>
            </form>
        </div>
    )
}
export default Form;