const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

//GET ONE SINGLE USER BY THEIR ID
router.get('/byID/:id', userController.getUserByID)

//GET ONE SINGLE USER BY THEIR USERNAME
router.get('/byName/:username', userController.getUserByUsername)

//GET MULTIPLE USERS
router.get('/', userController.getUsers)

//CREATE A NEW USER
router.post('/', userController.createUser)

//UPDATE AN EXISTING USER
router.put('/:id', userController.updateUser)

//DELETE AN USER
router.delete('/:id', userController.deleteUser)

module.exports = router;
