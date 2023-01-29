const express = require('express')
const router = express.Router()
const OffreController=require("../Controllers/offreController");
router.get('/GetAllOffres', OffreController.findAll);
router.get('/GetOffresPret', OffreController.findPret);
router.get('/GetOffresaccept', OffreController.findAccept);
router.get('/GetOffresBid', OffreController.findBid);
router.post('/PostOffre',OffreController.postOffre);
router.post('/PutOffre',OffreController.putOffre);
module.exports=router;  