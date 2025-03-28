import React, { useState } from 'react'
import { useAuth } from './auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../stylesheets/signupstyle.css'

function SignupPage(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const { setToken } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(password === password2)
        {
            try {
                const response = await axios.post(`http://localhost:8000/users`,{
                    username,
                    password,
                    pfp:"default"
                })
                console.log(response.data)
                setToken(response.data)
                navigate("/profile", { replace: true })
                setErrorMsg('')
            } catch (error) {
                console.log(error)
                setErrorMsg(String(error))
            }
        }
        else{
            setErrorMsg("Passwords don't match!")
        }
    }

    return <article className='signUpArticle'>
        <div className='signUpContainer'>
            <h3>Sign up</h3>
            <form>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' onChange={(e)=>setUsername(e.target.value)}/>
            </form>
            <form>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' onChange={(e)=>setPassword(e.target.value)}/>
            </form>
            <form>
                <label htmlFor='passwordR'>Repeat password</label>
                <input type='password' id='passwordR' onChange={(e)=>setPassword2(e.target.value)}/>
            </form>
            {errorMsg && <p className='errorMessage'>{errorMsg}</p>}
            <button type='submit' onClick={handleSubmit}>Sign up</button> 
        </div>
    </article>
}

export default SignupPage