import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuth } from './auth'
import { useNavigate } from 'react-router-dom'
import { getMapDataContext } from './mapData';

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

    return(
        <React.Fragment>
            <h2>hi</h2>
            {userPosts.map((item)=> {
                return <PostDescriptionCard key={item.postID} {...item}/>
            })}
        </React.Fragment>
    )

}

const PostDescriptionCard = ({adjacencyList, product, company, finalAssembly})=>{
    const navigate = useNavigate()
    const { setGraphData } = getMapDataContext();

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