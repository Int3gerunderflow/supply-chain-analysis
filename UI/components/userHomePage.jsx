import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuth } from './auth'
import { useNavigate } from 'react-router-dom'
import { getMapDataContext } from './mapData';
import { getCreatorDataContext } from './creatorData';

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
        navigate("/create", { replace: true })
    }

    return(
        <React.Fragment>
            <h2>hi</h2>
            {userPosts.map((item)=> {
                return <PostDescriptionCard key={item.postID} {...item}/>
            })}
            <button onClick={makeNewPost}>Make new post</button>
        </React.Fragment>
    )

}

const PostDescriptionCard = ({adjacencyList, product, company, finalAssembly})=>{
    const { setGraphData } = getMapDataContext();
    const navigate = useNavigate()

    const handleClick = () => {
        setGraphData({adjacencyList, finalAssembly})
        navigate("/map", { replace: true })
    }
    return(
        <div onClick={handleClick}>
            <h3>{product}</h3>
            <h4>{company}</h4>
        </div>
    )
}

export default UserHomePage