import React, { useState } from "react";
import axios from "axios"
import { getCreatorDataContext } from "./creatorData";
import './makeOrEditSupplier.css'

function MakeOrEditSupplier(){
    const {creatorData, setCreatorData} = getCreatorDataContext()
    console.log(creatorData);
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
        <article className="supplierEditor">
            <form>
                <label htmlFor='product'>Supplier Name</label>
                <input type='text' id='product' onChange={(e)=>setProduct(e.target.value)}/>
            </form>
            <form>
                <label htmlFor='company'>Description</label>
                <input type='text' id='company' onChange={(e)=>setCompany(e.target.value)}/>
            </form>
            <button type='submit' onClick={handleSubmit}>Save</button> 
        </article>
    )
}

export default MakeOrEditSupplier