import '../login/loginStyle.scss';
import { Link } from "react-router-dom";

const Signup =()=>{

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
                    name="password"
                    placeholder="Please enter your password"
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
                    />
                </div>
                <button>sign-up</button>
            </form>
        </div>
    </div>
    )
}
export default Signup;