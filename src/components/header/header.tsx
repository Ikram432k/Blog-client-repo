import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./headerStyle.scss";
interface propsUser{
    user:{
        _id:string,
        username:string
    }
}
const Nav =({user}:propsUser)=>{
    const[visible,setVisible]=useState<boolean>(false);
    const[userName,setUserName]=useState<any>('');
    useEffect(()=>{
        if(localStorage.getItem('userName')){
            setUserName(localStorage.getItem('userName'));
            setVisible(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])
    // useEffect(()=>{

    //     if(user.username){
    //         setUserName(user.username);
    //         setVisible(true);
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[user])
    const navigate = useNavigate();
    const navStyle={
        color:"white",
        textDecoration: 'none'
        };

    const logout=()=>{
        localStorage.clear();
        // setVisible(true)
        setVisible(false);
        setUserName('');
        navigate('*')

    }

    const takToProfile=()=>{
        navigate(`/dashboard/${user._id}/${user.username}`);
    }

    return(
        <div className="header-div">
            <div className="head-title">
                <Link style={navStyle} to="/">
                <h2>blog</h2>
                </Link>
            </div>
            <div className="header-btn" style={{display: visible ? 'flex' : 'none' }}>
                <button className="header-user-icon" onClick={takToProfile}>
                    <i className="fa fa-user-circle-o"></i>
                </button>
                    <div className="user">
                        <p>{userName}</p>
                        <button className="header-icon" onClick={logout} >
                            <i className='fas fa-sign-out-alt'></i>
                            <p>logout</p>
                        </button>
                    </div>
            </div>
        </div>
    )
}
export default Nav;