const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

//GET ONE SINGLE USER
router.get('/:id', userController.getUser)

//GET MULTIPLE USERS
router.get('/', userController.getUsers)

//CREATE A NEW USER
router.post('/', userController.createUser)

//UPDATE AN EXISTING USER
router.put('/:id', userController.updateUser)

//DELETE AN USER
router.delete('/:id', userController.deleteUser)

module.exports = router;
