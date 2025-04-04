import React, { useEffect, useState }from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import '../stylesheets/navstyle.css';

function Navbar()
{
    const {token,setToken} = useAuth();
    const [logInOut, setLogInOut] = useState('Log In')
    const navigate = useNavigate();

    useEffect(()=>{
        if(token)
        {
            setLogInOut('Log Out')
        }
        else
        {
            setLogInOut('Log In')
        }
    }, [token])

    const handleLogInOut = (e) =>{
        e.preventDefault();
        if(logInOut === 'Log In')
        {
            navigate('/login')
        }
        else if(logInOut === 'Log Out')
        {
            setToken(null)
        }
    }

    return <nav>
        <p onClick={(e)=>navigate("/")}>Home</p>
        <p onClick={(e)=>navigate("/community")}>Community</p>
        {token && <p onClick={(e)=>navigate("/profile")}>My Posts</p>}
        <p className="loginNav" onClick={(e)=>handleLogInOut(e)}>{logInOut}</p>
            
    </nav>
}

export default Navbar