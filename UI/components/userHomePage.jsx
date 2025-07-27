import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuth } from './auth'
import { useNavigate } from 'react-router-dom'
import { getMapDataContext } from './mapData';
import { getCreatorDataContext } from './creatorData';
import PostDescriptionCard from './postDescriptionCard';
import '../stylesheets/userProfilePage.css'

function UserHomePage(){
    const [userPosts, setUserPosts] = useState([])
    const {token} = useAuth();
    const payloadEncoded = token.split('.')[1]
    const payload = JSON.parse(atob(payloadEncoded))
    

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await axios.get(`http://localhost:8000/users/posts/${payload.id}`);
          setUserPosts(response.data)
        };
        fetchPosts();
      }, []);

    const { setCreatorData } = getCreatorDataContext();
    const navigate = useNavigate()

    const makeNewPost = ()=>{
        const creatorData = {
            postID: null,
            adjacencyList: {},
            finalAssembly: null,
        }
        setCreatorData(creatorData);
        navigate("/createnew")
    }

    const handleDeletePost = async (postID) => {
        const result = await axios.delete(`http://localhost:8000/posts/${postID}`)
        if(result.status == 200)
        {
            setUserPosts(userPosts.filter((post)=>post.postID !== postID))
        }
    }

    return(
        <React.Fragment>
            <section className='welcomeBanner'>
                <h2>Welcome {payload.username} 👋</h2>
            </section>
            
            <article className='postsGrid'>
                <div id="addNewPostCard">
                    <h3>Make New Post</h3>
                    <button onClick={makeNewPost}>Make new post</button>
                </div>
                {userPosts.map((item)=> {
                    const data = {postID:item.postID, ...item, showEdit:true}
                    return <PostDescriptionCard key={item.postID} {...data} onDelete={()=>handleDeletePost(item.postID)}/>
                })}
            </article>  
        </React.Fragment>
    )
}



export default UserHomePage