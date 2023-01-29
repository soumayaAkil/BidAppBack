const express = require('express')
const router = express.Router()
const ClientController=require("../Controllers/clientController");
router.get('/GetAllClients', ClientController.findAll);

module.exports=router;  