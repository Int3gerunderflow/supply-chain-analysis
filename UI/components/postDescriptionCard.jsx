import React from "react";
import axios from 'axios';
import { getMapDataContext } from './mapData';
import { getCreatorDataContext } from './creatorData';
import { useNavigate } from "react-router-dom";

const PostDescriptionCard = ({postID, adjacencyList, product, company, finalAssembly, showEdit, onDelete})=>{
    const { setGraphData } = getMapDataContext();
    const { setCreatorData } = getCreatorDataContext();
    const navigate = useNavigate()

    //when the "view" button is clicked
    const handleClick = () => {
        setGraphData({postID, adjacencyList, finalAssembly})
        navigate("/map")
    }

    const handleClickEdit = () => {
        setCreatorData({postID, adjacencyList:[], finalAssembly})
        navigate("/create")
    }


    let style1 = {width:'100%'}
    let style2= {}
    if(showEdit !== true)
    {
        style2=style1
    }

    return(
        <div className="postIDCard">
            <div className="postIDCardTitle">
                <h3>{product}</h3>
                {showEdit && <img onClick={onDelete}id="deleteBin" src="../assets/bin.svg"></img>}
            </div>
            
            <h4>{company}</h4>
            <div className='inlineButtons'>
                {showEdit && <button onClick={handleClickEdit}>Edit</button>}
                <button onClick={handleClick} style={style2}>View</button>
            </div>
        </div>
    )
}

export default PostDescriptionCard