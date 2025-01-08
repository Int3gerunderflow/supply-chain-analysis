const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

//GET ONE SINGLE USER
router.get('/users/:id', userController.getUser)

//GET MULTIPLE USERS
router.get('/users', userController.getUsers)

//CREATE A NEW USER
router.post('/users', userController.createUser)

//UPDATE AN EXISTING USER
router.put('/users/:id', userController.updateUser)

//DELETE AN USER
router.delete('/users/:id', userController.deleteUser)

module.exports = router;
