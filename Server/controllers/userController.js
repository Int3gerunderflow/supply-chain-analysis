const { getAllUsers, insertIntoDatabase, updateUserInDatabase, getSingleUserByUsername,
    deleteUserInDatabase, getSingleUserByID
 } = require('../models/userModel');
const jwt = require('jsonwebtoken')

const createUser = async (req,res)=>{
    const result = await insertIntoDatabase(req.body)
    const newlyMadeUser = await getSingleUserByUsername(req.body.username)

    const payload = {
        id: newlyMadeUser.id,
        username: newlyMadeUser.username,
        pfp: newlyMadeUser.profilePicLocation
    }

    jwt.sign(payload, process.env.AUTHKEY, {expiresIn: "1h"}, (err, token)=>{
        if(err) throw err
        res.send(token)
    })

    
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
    res.send(result)
}

const loginUser = async (req,res)=>{
    const {username,password} = req.body
    const user = await getSingleUserByUsername(username)

    if(!user)
    {
        const error = new Error
        error.status = 404
        error.message = "No user found with that username"
        throw error
    }

    if(username === user.username && password === user.passphrase)
    {
        const payload = {
            id: user.id,
            username: user.username,
            pfp: user.profilePicLocation
        }
        jwt.sign(payload, process.env.AUTHKEY, {expiresIn: "30d"}, (err, token)=>{
            if(err) throw err
            res.send(token)
        })
    }
    else
    {
        const error = new Error
        error.status = 401
        error.message = "Wrong password"
        throw error
    }
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
    loginUser,
    createUser,
    getUserByID,
    getUserByUsername,
    getUsers,
    updateUser,
    deleteUser
}