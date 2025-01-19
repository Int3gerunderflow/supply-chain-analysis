const { 
    getSupplyChainPostDetails,
    makeNewPost,
    makeNewSupplier
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

const createNewPost = async (req,res) => {
    const result = await makeNewPost(req.body)
    res.send(result)
}

const createNewSupplier = async (req,res) => {
    const result = await makeNewSupplier(req.body)
    res.send(result)
}

module.exports = { getPostDetails, createNewPost, createNewSupplier }