const express = require('express');
const router = express.Router();
const supplyChainController = require('../controllers/supplyChainController')

//GET ALL PUBLIC POSTS
router.get('/', supplyChainController.getAllPublicPosts)

//GET ONE POST BY ITS ID

router.get('/:postID', supplyChainController.getPostDetails)

router.get('/supplier/:supplyID', supplyChainController.getSupplierDetails)

router.post('/', supplyChainController.createNewBlankPost)

router.put('/:postID/details', supplyChainController.updatePostDetails) 

router.put('/:postID/adjacencyList', supplyChainController.updatePostAdjList)

router.post('/supplier', supplyChainController.createNewSupplier)

router.put('/supplier/:supplyID', supplyChainController.updateSupplier)

router.delete('/:postID', supplyChainController.deletePost)

module.exports = router