const express = require('express');
const router = express.Router();
const supplyChainController = require('../controllers/supplyChainController')

//GET ONE POST BY ITS ID

router.get('/:postID', supplyChainController.getPostDetails)

router.get('/supplier/:supplyID', supplyChainController.getSupplierDetails)

router.post('/', supplyChainController.createNewBlankPost)

router.put('/:postID', supplyChainController.updatePost) 

router.post('/supplier', supplyChainController.createNewSupplier)

module.exports = router