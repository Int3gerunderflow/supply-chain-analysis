const { getAllUsers, insertIntoDatabase, updateUserInDatabase, getSingleUserByUsername,
    deleteUserInDatabase, getSingleUserByID
 } = require('../models/userModel')

const createUser = async (req,res)=>{
    const result = await insertIntoDatabase(req.body)
    res.send(result)
}

const getUserByID = async (req,res)=>{
    const id = req.params.id;
    const result = await getSingleUserByID(id)
    if(!result)
    {
        const error = new Error
        error.status = 404
        error.message = "No user found with that ID"
        throw error
    }
    res.send(result)
}

const getUserByUsername = async (req,res)=>{
    const username = req.params.username;
    const result = await getSingleUserByUsername(username)
    if(!result)
    {
        const error = new Error
        error.status = 404
        error.message = "No user found with that username"
        throw error
    }
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:5173')
    res.header("Access-Control-Allow-Credentials", true);
    res.send(result)
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
    getUserByID,
    getUserByUsername,
    getUsers,
    updateUser,
    deleteUser
}