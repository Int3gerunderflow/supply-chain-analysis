import React, { useState } from "react";
import axios from "axios"

function MakeOrEditSupplier({postIDprop, supplierData}){
    const postID = postIDprop
    const [name, setName] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)


    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    const handleSubmitNewPost = async (e) => {
        e.preventDefault()
        await axios.post(`http://localhost:8000/posts`,{
            userID,
            product,
            company,
            description,
            finalAssembly: -1
        })
    }

    return(
        <article className="postEditor">
            <form>
                <label htmlFor='product'>Product Name</label>
                <input type='text' id='product' onChange={(e)=>setProduct(e.target.value)}/>
            </form>
            <form>
                <label htmlFor='company'>Company Name</label>
                <input type='text' id='company' onChange={(e)=>setCompany(e.target.value)}/>
            </form>
            <form>
                <label htmlFor='desc'>Description:</label>
                <input type='text' id='desc' onChange={(e)=>setDescription(e.target.value)}/>
            </form>
            <button type='submit' onClick={handleSubmit}>{postOrSave}</button> 
        </article>
    )
}

export default MakeOrEditSupplier