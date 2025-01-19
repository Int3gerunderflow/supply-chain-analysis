const { 
    getSupplyChainPostDetails,
    getSupplierByID,
    makeNewPost,
    makeNewSupplier,
    deletePostByID,
    deleteSupplierByID
 } = require("../models/supplyChainModel");

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

const createNewPost = async (req,res) => {
    const result = await makeNewPost(req.body)
    res.send(result)
}

const createNewSupplier = async (req,res) => {
    const result = await makeNewSupplier(req.body)
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

module.exports = { getPostDetails, getSupplierDetails, createNewPost, createNewSupplier, deletePost, deleteSupplier }