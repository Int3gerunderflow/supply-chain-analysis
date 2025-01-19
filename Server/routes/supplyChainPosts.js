const express = require('express');
const router = express.Router();
const supplyChainController = require('../controllers/supplyChainController')

//GET ONE POST BY ITS ID
router.get('/:postID', supplyChainController.getPostDetails)

router.post('/', supplyChainController.createNewPost)

router.post('/supplier', supplyChainController.createNewSupplier)

module.exports = router