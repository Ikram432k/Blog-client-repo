import { Link } from "react-router-dom";
import "./headerStyle.scss";
const Nav =()=>{
    const navStyle={
        color:"white",
        textDecoration: 'none'
        };
    return(
        <div className="divd">
            <Link style={navStyle} to="/">
            <h2>blog</h2>
            </Link>
        </div>
    )
}
export default Nav;