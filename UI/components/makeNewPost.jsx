import React, { useContext } from "react";
import axios from "axios";
import { useAuth } from './auth';
import { PostEditorContext } from "./postEditorContext";
import { getCreatorDataContext } from "./creatorData";
import { useNavigate } from "react-router-dom";
import '../stylesheets/makeNewPost.css'

function MakeNewPostPage()
{
    const {product,setProduct,company,setCompany,description,setDescription}= useContext(PostEditorContext)
    const { creatorData, setCreatorData } = getCreatorDataContext();

    //section to get the logged in user's ID
    const {token} = useAuth()
    const payloadEncoded = token.split('.')[1]
    const userID = JSON.parse(atob(payloadEncoded)).id

    const navigate = useNavigate();

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
        navigate("/create")
    }

    return(
        <section className="makeNewPost">
            <article>
                <form>
                    <label htmlFor='product'>Product Name:</label>
                    <input type='text' id='product' value={product || ''} onChange={(e)=>setProduct(e.target.value)}/>
                </form>
                <form>
                    <label htmlFor='company'>Company Name:</label>
                    <input type='text' id='company' value={company || ''} onChange={(e)=>setCompany(e.target.value)}/>
                </form>
                <form>
                    <label htmlFor='desc'>Description:</label>
                    <input type='text' id='desc' value={description || ''} onChange={(e)=>setDescription(e.target.value)}/>
                </form>
                <button type='submit' onClick={handleSubmitNewPost}>Save</button> 
            </article>
        </section>
        
    )
}

export default MakeNewPostPage