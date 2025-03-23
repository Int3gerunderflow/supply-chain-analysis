import React from 'react'
import './postInfoCard.css'

const PostInfoCard = ({product, company, description}) =>{
    return (<section className='postInfo'>
        <h2>{product}</h2>
        <h4>{company}</h4>
        <p>{description}</p>
    </section>)
}

export default PostInfoCard