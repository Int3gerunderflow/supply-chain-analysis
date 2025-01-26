const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const { getUsersPosts } = require('../controllers/supplyChainController')
const checkToken = require('../middleware/checkToken')  //middleware to guard protected routes

//GET ONE SINGLE USER BY THEIR ID
router.get('/byID/:id', checkToken, userController.getUserByID)

//GET ONE SINGLE USER BY THEIR USERNAME
router.get('/byName/:username', checkToken, userController.getUserByUsername)

//GET A USER'S POSTS BY THEIR ID
router.get('/posts/:userID', getUsersPosts)

//ATTEMPT USER LOGIN
router.post('/login', userController.loginUser)

//GET MULTIPLE USERS
router.get('/', userController.getUsers)

//CREATE A NEW USER
router.post('/', userController.createUser)

//UPDATE AN EXISTING USER
router.put('/:id', checkToken, userController.updateUser)

//DELETE AN USER
router.delete('/:id', checkToken, userController.deleteUser)


module.exports = router;
