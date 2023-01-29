
const Room = require('../models/roomModel');
const{ validationResult } = require('express-validator');

const mqtt = require('mqtt')



exports.postRoom= async(req,res,next)=>{
    const errors= validationResult(req);
  
  try{
    

      console.log(req.body);
 
      let current_value = req.body.current_value;
      let nom = req.body.nom;
      let prenom = req.body.prenom; 
      let id_bid = req.body.id_bid;
      let time_add = req.body.time_add;
      console.log(new Date());
      console.log("node 2022-12-07T17:17:26.799Z /n flutter 2022-12-07 17:09:36.005509");
      //let time_add = req.body.time_add;
    
     
     let [resval] =await Room.getVal(id_bid);
     let topic=resval[0].topic;
     let current_val=resval[0].current_value;
     console.log(resval);

    if(current_value > current_val)
    {
        console.log(current_value);
        let result =await Room.postVal(nom,prenom,current_value,id_bid,time_add );
        // nzidou
var client = mqtt.connect('mqtt://localhost:1234')
     

var message =current_value.toString();

client.on('connect', ()=>{
    //setInterval(()=>{
        client.publish(topic, message)
        console.log('Message sent!', message)
   // }, )
})

    }

     res.status(201).json({message:'Room enregistrer'})

  
  }catch(err){
    if(!err.statusCode){
      err.statusCode=500;
      console.log(err);
    }  
    next(err);
    } 
  }