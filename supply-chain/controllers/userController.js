const { getAllUsers, insertIntoDatabase } = require('../models/userModel')

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
    res.send("UPDATE USER")
}

const deleteUser = async (req,res)=>{
    res.send("DELETE USER")
}

module.exports = {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
}