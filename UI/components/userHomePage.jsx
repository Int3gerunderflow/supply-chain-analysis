import React, { useState } from 'react'
import { useAuth } from './auth'

function UserHomePage(){
    const {token} = useAuth();
    const payloadEncoded = token.split('.')[1]
    const payload = JSON.parse(atob(payloadEncoded))
    console.log(payload)
    return(
        <React.Fragment>
            <h2>hi</h2>
        </React.Fragment>
    )

}

export default UserHomePage