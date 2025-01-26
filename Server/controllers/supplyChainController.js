const { 
    getAllPostsAssociatedByUserID,
    getSupplyChainPostDetails,
    getSupplierByID,
    makeNewBlankPost,
    updatePostInDatabase,
    makeNewSupplier,
    deletePostByID,
    deleteSupplierByID
 } = require("../models/supplyChainModel");

const getUsersPosts = async (req,res) => {
    const userID = req.params.userID
    const result = await getAllPostsAssociatedByUserID(userID)
    res.send(result)
}

const getPostDetails = async (req,res) => {
    const postID = req.params.postID;
    const result = await getSupplyChainPostDetails(postID)
    if(!result)
    {
        const error = new Error
        error.status = 404
        error.message = "No post found with that ID"
        throw error
    }
    res.send(result)
}

const getSupplierDetails = async (req,res) => {
    const supplyID = req.params.supplyID
    const result = await getSupplierByID(supplyID)
    if(!result)
    {
        const error = new Error
        error.status = 404
        error.message = "No supplier found with that ID"
        throw error
    }
    res.send(result)
}

const createNewBlankPost = async (req,res) => {
    const result = await makeNewBlankPost(req.body)
    res.send(result)
}

const updatePost = async (req,res) => {
    const params = { postID:req.params.postID, ...req.body }
    const result = await updatePostInDatabase(params)
    res.send(result)
}

const deletePost = async (req,res) => {
    const result = await deletePostByID(req.params.postID)
    if(result.affectedRows < 1)
    {
        const error = new Error
        error.status = 404
        error.message = "No post found with that ID"
        throw error
    }
    res.send(result)
}

const createNewSupplier = async (req,res) => {
    const result = await makeNewSupplier(req.body)
    res.send(result)
}

const deleteSupplier = async (req,res) => {
    const result = await deleteSupplierByID(req.params.supplyID)
    if(result.affectedRows < 1)
    {
        const error = new Error
        error.status = 404
        error.message = "No supplier found with that ID"
        throw error
    }
    res.send(result)
}

module.exports = { 
    getUsersPosts,
    getPostDetails, 
    getSupplierDetails, 
    createNewBlankPost,
    updatePost, 
    deletePost, 
    createNewSupplier,
    deleteSupplier
 }