const express = require('express')
const router = express.Router()
const bidController=require("../Controllers/bidController");
router.get('/GetAllBids', bidController.findAll);
router.post('/getAllBidDetail',bidController.FindAllDetail);
router.get('/GetAllBidsByDate', bidController.findAllDate);
router.post('/PostBid',bidController.postBid);
router.post('/postmqtt',bidController.postmqtt);
router.post('/PostuserBid',bidController.inscritBid);
router.post('/Postcode',bidController.checkCode);
module.exports=router;  