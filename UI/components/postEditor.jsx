import React, { useState} from "react";
import axios from "axios"
import './postEditor.css';
import { getCreatorDataContext } from "./creatorData";

function PostEditor({userIDprop, adjListprop}){
    const userID = userIDprop
    const [product, setProduct] = useState('')
    const [company, setCompany] = useState('')
    const [description, setDescription] = useState('')

    const { creatorData, setCreatorData } = getCreatorDataContext();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            handleSubmitNewPost(e)
        }
        catch(error)
        {
            console.log(error)
        }
    }

    const handleSubmitNewPost = async (e) => {
        e.preventDefault()
        const result = await axios.post(`http://localhost:8000/posts`,{
            userID,
            product,
            company,
            description,
            finalAssembly: -1
        })
        creatorData.postID = result.data.insertId
        setCreatorData(creatorData)
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
            <button type='submit' onClick={handleSubmit}>Save</button> 
        </article>
    )
}

export default PostEditor