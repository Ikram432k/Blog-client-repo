import './loginStyle.scss';
import { Link ,useNavigate} from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
interface usercredentials {
    username: string,
    password: string
}

const Login = () => {


    const navigate = useNavigate();

    const [user, setUser] = useState<usercredentials>({
        username: '',
        password: ''
    })

    const [errMsg,setMsg] = useState();

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
            const response = await axios.post(`http://localhost:3000/api/login`, user);
            if(response.data.info){
                setMsg(response.data.info.message);
                return;
            }
            console.log(response)
            const tokenId = response.data.token;
            const databody = response.data.body;
            localStorage.setItem('token',tokenId);
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
                    <Link to="/signup">Or sign up for a new account</Link>
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
                        <button className="loginBtn"onClick={submitForm}>Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;