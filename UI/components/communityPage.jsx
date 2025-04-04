import React, { useEffect, useState } from "react";
import axios from "axios";
import PostDescriptionCard from "./postDescriptionCard";
import '../stylesheets/communityPage.css'

function CommunityPage(){
    const [posts,setPosts] = useState([])

    useEffect(()=>{
        const fetchPosts = async () => {
            const response = await axios.get(`http://localhost:8000/posts`);
            setPosts(response.data)
          };
          fetchPosts();
    },[])
    return (
        <>
        <section className="communityHeader">
            <h2>Community posts</h2>
        </section>
        <article className="postsGrid">
            {posts.map((item)=>{
                const data = {postID:item.postID, ...item, showEdit:false}
                return <PostDescriptionCard key={item.postID} {...data}/>
            })}
        </article>
        </>
    )
}

export default CommunityPage