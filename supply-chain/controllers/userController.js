const { getAllUsers, insertIntoDatabase, updateUserInDatabase, findUserIDByUsername,
    deleteUserInDatabase
 } = require('../models/userModel')

const createUser = async (req,res)=>{
    const result = await insertIntoDatabase(req.body)
    res.send(result)
}

const getUser = async (req,res)=>{
    const id = req.params.id;
    res.send(`GET USER WITH ID ${id}`)
}

const getUsers = async (req,res)=>{
    const result = await getAllUsers()
    if(!result){
        res.send("ERROR")
    }
    res.send(result)
}

const updateUser = async (req,res)=>{
    const id = req.params.id
    const result = await updateUserInDatabase({id,...req.body})
    if(result.affectedRows < 1)
    {
        const error = new Error
        error.status = 404
        error.message = "No user found with that ID"
        throw error
    }
    res.send(result)
}

const deleteUser = async (req,res)=>{
    const id = req.params.id
    const result = await deleteUserInDatabase(id)
    if(result.affectedRows < 1)
    {
        const error = new Error
        error.status = 404
        error.message = "No user found with that ID"
        throw error
    }
    res.send(result)
}

module.exports = {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
}