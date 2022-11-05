import '../login/loginStyle.scss';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
interface obj{
    username:string,
    password:string,
    confirmPassword:string
}
const Signup =()=>{
    const [user,setUser] = useState<obj>({
        username:'',
        password:'',
        confirmPassword:''
    })

    const handleChange=(e: any)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    const validation=()=>{
        const{username,password,confirmPassword}=user;
        if(!username || !password || !confirmPassword){
            alert('please make sure fill all the fields');
            return false;
        }
        return true;
    }

    const clearForm=()=>{
        setUser({
            username:'',
            password:'',
            confirmPassword:''
        });
    }

    const submitForm=()=>{
        if(validation()){
            signupUser();
        }
    }
    
    const signupUser =async()=>{
        try{
        await axios.post(`http://localhost:3000/api/signup`,user);
        clearForm();
        }catch(err){
            return err;
        }
    }

    return(
        <div className='mainpage'>
        <div className='pageForm'>
            <div className='formHead'>
                <h2>
                Sign up to create your account
                </h2>
                <Link to="/login">Or login if account already exists</Link>
            </div>
            <form className='loginForm'>
                <div className='box'>
                    <label htmlFor="username">
                    Username :
                    </label>
                    <input
                    type='text'
                    name="username"
                    placeholder="Please enter your name"
                    onChange={handleChange}
                    />
                </div>
                <div className='box'>
                    <label htmlFor="password">
                    Password :
                    </label>
                    <input
                    type='password'
                    name="password"
                    placeholder="Please enter your password"
                    onChange={handleChange}
                    />
                </div>
                <div className='box'>
                    <label htmlFor="password">
                    Confirm password :
                    </label>
                    <input
                    type='password'
                    name="confirmPassword"
                    placeholder="Please enter your password again"
                    onChange={handleChange}
                    />
                </div>
                <Link to={`/login`}>
                    <button className='loginBtn' onClick={submitForm}>sign-up</button>
                </Link>
            </form>
        </div>
    </div>
    )
}
export default Signup;