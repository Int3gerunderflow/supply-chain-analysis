import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from './auth'
import { useNavigate } from 'react-router-dom'

function LoginPage(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [welcome, setWelcome] = useState('')

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
            navigate("/map", { replace: true })
        } catch (error) {
            console.log(error)
        }
    }

    return <article>
        <form>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' onChange={(e)=>setUsername(e.target.value)}/>
        </form>
        <form>
            <label htmlFor='password'>Password</label>
            <input type='text' id='password' onChange={(e)=>setPassword(e.target.value)}/>
        </form>
        <button type='submit' onClick={handleSubmit}>Login</button> 
    </article>
}

export default LoginPage