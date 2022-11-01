import './loginStyle.scss';
import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
interface usercredentials {
    username: string,
    password: string
}

const Login = () => {


    const [user, setUser] = useState<usercredentials>({
        username: '',
        password: ''
    })

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
            const tokenId = response.data.token;
            const databody = response.data.body;
            localStorage.setItem('user',JSON.stringify(databody))
            localStorage.setItem('token',tokenId);
        } catch (err) {
            return err;
        }
    }

    const submitForm = () => {
        if (validation()) {
            loginUser();
        }
        clearForm();

    }
    let currentUser = localStorage.getItem('user')!;
    let lstoken = localStorage.getItem('token')!;

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
                    </div>
                    <Link to={`/dashboard/${lstoken}/${currentUser}`}>
                        <button onClick={submitForm}>Login</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}
export default Login;