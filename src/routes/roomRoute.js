const express = require('express')
const router = express.Router()
const RoomController=require("../Controllers/roomController");
router.post('/postRoom',RoomController.postRoom);
module.exports=router;  