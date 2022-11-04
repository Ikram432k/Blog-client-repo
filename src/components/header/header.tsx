import { Link } from "react-router-dom";
import "./headerStyle.scss";
const Nav =()=>{
    const navStyle={
        color:"white",
        textDecoration: 'none'
        };

    const logout=()=>{
        localStorage.clear();
    }
    return(
        <div className="divd">
            <Link style={navStyle} to="/">
            <h2>blog</h2>
            </Link>
            <Link to="/">
            <button onClick={logout}>
            <i className='fas fa-sign-out-alt'></i>
            </button>
            </Link>
        </div>
    )
}
export default Nav;