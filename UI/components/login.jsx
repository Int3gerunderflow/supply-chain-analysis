import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from './auth'
import { useNavigate } from 'react-router-dom'
import '../stylesheets/loginstyle.css'

function LoginPage(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errormsg, setErrormsg] = useState('')

    const { setToken } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:8000/users/login`,{
                username,
                password
            })
            setToken(response.data)
            navigate("/profile")
        } catch (error) {
            console.log(error)
            if(error.status === 404)
            {
                setErrormsg('Username not found')
            }
        }
    }

    return <article>
        <div className='login-container'>
            <h3>Login</h3>
            <form>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' onChange={(e)=>setUsername(e.target.value)}/>
            </form>
            <form>
                <label htmlFor='password'>Password</label>
                <input type='text' id='password' onChange={(e)=>setPassword(e.target.value)}/>
            </form>
            <p className="errorMessage">{errormsg}</p>
            <button type='submit' onClick={handleSubmit} id='firstButton'>Login</button> 
            <p>────────── or ──────────</p>
            <button type='submit' onClick={(e)=>navigate('/signup')}>Sign up</button> 
        </div>
    </article>
}

export default LoginPage