
  //const  parsePhoneNumber = require("libphonenumber-js/min");
//var multer, storage, path, crypto;
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { request } = require('http');
 var springedge = require('springedge');
 const Vonage =require('@vonage/server-sdk');
 const Produit=require('../models/produitModel');
 require('dotenv');

// for productt
exports.sendSMS = async(req,res,next)=>{
 const vv= new Vonage({
  applicationId:'a0f69cbf-9846-40ab-9e52-3f2dc9cabbfb',
  privateKey:'./private.key'
 });
 const textMessage = "votre code est : 95463278 ";
 const toNumber ='21629279679';
 vv.channel.send(
  { type:'sms', number: toNumber},
  { type:'sms', number: 'Vonage'},
  {
     content:{
      type: 'text',
      text: textMessage,
     },
  },
  (err,responseData)=>{
    if(err){
      console.log('Message failed with error:',err);
    }else{
     
      console.log('Message:',responseData.message_uuid,'send successfully');
    
      return res.status(200);}
  }
 );
 
}
  /*
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);``
    //const twilioClient = require("twilio")(accountSid, authToken);
  twilioClient.messages.create({
    from: "+21629279679",
    to: "+21625192799",
    body: `This is the ship that made the Kessel Run in fourteen parsecs?`,
  });
 

var params = {
  'apikey': '6on957rb36978j0rl148a6j226v03jmr', // API Key 
  'sender': 'SEDEMO', // Sender Name 
  'to': [
    '21629279679'  //Moblie Number 
  ],
  'message': 'test+soumaya',
  'format': 'json'
};

springedge.messages.send(params, 5000, function (err, response) {
  if (err) {
    return console.log(err);
  }
  console.log(response);
});
*/

exports.postPicture =async (req, res)=> {
   console.log("dddddddddddddddd");
        res.redirect("/images/");
        imageProd=req.file.filename;
   console.log(req.file.filename) 
   /* 
   console.log(req.files.length)
   console.log(req.files[0].filename)
   */
       //console.log("resssss",res.status(200))
       
       const ress= await Produit.getid();
       rows = ress[0];
       id_prod=rows[0].maxIdProd;
       console.log(id_prod);
      imageProd=req.file.filename;

       const restt= await Produit.postImageProd(imageProd,id_prod);

  return res.status(200);
        
      }

  

