import './loginStyle.scss';
import { Link } from "react-router-dom";

const Login =()=>{

    return(
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
                    name="usernme"
                    placeholder="Please enter your name"
                    />
                </div>
                <div className='box'>
                    <label htmlFor="password">
                    Password :
                    </label>
                    <input
                    type='password'
                    name="pssword"
                    placeholder="Please enter your password"
                    />
                </div>
                <button>Login</button>
            </form>
        </div>
    </div>
    )
}
export default Login;