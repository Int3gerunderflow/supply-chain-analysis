import React, { createContext, useState } from "react";

export const PostEditorContext = createContext();

//context portion for the post editor
export const PostEditorProvider = ({children}) => 
{
    const [product, setProduct] = useState("")
    const [company, setCompany] = useState("")
    const [description, setDescription] = useState("")

    return(
        <PostEditorContext.Provider value={{product,setProduct,company,setCompany,description,setDescription}}>
            {children}
        </PostEditorContext.Provider>
    )
}