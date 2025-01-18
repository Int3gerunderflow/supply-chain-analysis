const express = require('express');
const router = express.Router();
const supplyChainController = require('../controllers/supplyChainController')

//GET ONE SINGLE USER BY THEIR ID
router.get('/:postID', supplyChainController.getPostDetails)

module.exports = router