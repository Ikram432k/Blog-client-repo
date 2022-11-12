import './loginStyle.scss';
import { Link ,useNavigate} from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
interface usercredentials {
    username: string,
    password: string
}
interface propsFunction{
    getUser:Function
}
const Login = (props:propsFunction) => {
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('userName')){
            navigate(`*`);
            alert(`Already logged in as ${localStorage.getItem('userName')}`)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const [user, setUser] = useState<usercredentials>({
        username: '',
        password: ''
    })
    const [errMsg,setMsg] = useState<string>();
    useEffect(()=>{
        setMsg("");
    },[user])
    const handleChange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const validation = () => {
        const { username, password } = user;
        if (!username || !password) {
            alert('please make sure fill all the fields')
            return false;
        }
        return true;
    }
    const clearForm = () => {
        setUser({
            username: '',
            password: ''
        });
    }
    const loginUser = async () => {
        try {
            const response = await axios.post(`https://web-production-9701.up.railway.app/api/login`, user);
            if(response.data.info){
                setMsg(response.data.info.message);
                return;
            }
            const tokenId = response.data.token;
            const databody = response.data.body;
            localStorage.setItem('token',tokenId);
            localStorage.setItem('userName',databody.username);
            props.getUser(databody);
            navigate(`/dashboard/${databody._id}/${databody.username}`);
        } catch (err) {
            return err;
        }
    }
    const submitForm = (e: any) => {
        e.preventDefault()
        if (validation()) {
            loginUser();
        }
        clearForm();
    }
    return (
        <div className='mainpage'>
            <div className='pageForm'>
                <div className='formHead'>
                    <h2>
                        Sign in to your account
                    </h2>
                </div>
                <form className='loginForm'>
                    <div className='box'>
                        <label htmlFor="username">
                            Username :
                        </label>
                        <input
                            type='text'
                            name="username"
                            value={user.username}
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
                            value={user.password}
                            placeholder="Please enter your password"
                            onChange={handleChange}
                        />
                        <p>{errMsg}</p>
                    </div>
                    <div className='box'>
                        <button className="loginBtn"onClick={submitForm}>Login</button>
                    </div>
                    <div className='formHead'>
                    <Link to="/signup">Or sign up for a new account</Link>
                </div>
                </form>
            </div>
        </div>
    )
}
export default Login;