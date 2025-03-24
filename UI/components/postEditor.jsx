import React, { useContext, useEffect } from "react";
import axios from "axios"
import '../stylesheets/postEditor.css';
import { getCreatorDataContext } from "./creatorData";
import { PostEditorContext } from "./postEditorContext";

const PostEditor = ({userIDprop}) => 
{
    const userID = userIDprop
    const {product,setProduct,company,setCompany,description,setDescription}= useContext(PostEditorContext)
    const { creatorData, setCreatorData } = getCreatorDataContext();

    useEffect(()=>{
        const getPostInfo = async ()=>
        {
            const postInfo = await axios.get(`http://localhost:8000/posts/${creatorData.postID}`)
            if(postInfo)
            {
                setProduct(postInfo.data.product)
                setCompany(postInfo.data.company)
                setDescription(postInfo.data.description)
            }
        }
        getPostInfo()
    }, [])
    
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            handleUpdatePost(e)
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

    const handleUpdatePost = async (e) => {
        e.preventDefault()
        const postID= creatorData.postID
        const result = await axios.put(`http://localhost:8000/posts/${postID}/details`,{
            userID,
            product,
            company,
            description,
        })
    }


    return(
        <article className="postEditor">
            <form>
                <label htmlFor='product'>Product Name</label>
                <input type='text' id='product' value={product || ''} onChange={(e)=>setProduct(e.target.value)}/>
            </form>
            <form>
                <label htmlFor='company'>Company Name</label>
                <input type='text' id='company' value={company || ''} onChange={(e)=>setCompany(e.target.value)}/>
            </form>
            <form>
                <label htmlFor='desc'>Description:</label>
                <input type='text' id='desc' value={description || ''} onChange={(e)=>setDescription(e.target.value)}/>
            </form>
            <button type='submit' onClick={handleSubmit}>Save</button> 
        </article>
    )
}

export default PostEditor