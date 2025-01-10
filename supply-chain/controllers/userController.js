const { getAllUsers } = require('../models/userModel')

const createUser = async (req,res)=>{
    res.send("CREATE USER")
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
    res.send(result[0])
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