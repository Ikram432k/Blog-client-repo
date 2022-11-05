import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./headerStyle.scss";

const Nav =()=>{
    const[visible,setVisible]=useState<boolean>(true)
    const navigate = useNavigate();
    const navStyle={
        color:"white",
        textDecoration: 'none'
        };

    const login=()=>{
        setVisible(false)
        navigate('/login')
    }
    const logout=()=>{
        // setSettrue(view.show)
        localStorage.clear();
        setVisible(true)
        navigate('/')
    }

    return(
        <div className="header-div">
            <div className="head-title">
                <Link style={navStyle} to="/">
                <h2>blog</h2>
                </Link>
            </div>
            <div className="header-btn">
            <button className="header-icon" onClick={logout} style={{display: !visible ? 'block' : 'none' }}>
            <i className='fas fa-sign-out-alt'></i>
            <p>logout</p>
            </button>
            <button className="header-icon" onClick={login} style={{display: visible ? 'block':'none' }}>
            <i className='fas fa-sign-in-alt'></i>
            <p>login</p>
            </button>
            </div>
        </div>
    )
}
export default Nav;