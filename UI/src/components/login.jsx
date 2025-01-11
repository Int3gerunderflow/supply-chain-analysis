import React, { useState } from 'react'

function LoginPage(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8000/users/byName/${username}`,{
                mode: 'cors'
            })
            console.log(response)
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