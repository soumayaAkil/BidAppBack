const Bid = require('../models/bidModel');
const Offre=require('../models/offreModel');
const Produit=require('../models/produitModel');
const { Vonage} = require('@vonage/server-sdk');
const{ validationResult } = require('express-validator');
const mqtt=require('mqtt');
const url = 'ws://broker.emqx.io:8083/mqtt'

exports.postmqtt=async(req,res,next)=>{

  try{
    const [alloffres] = await Bid.fetchAll();
    id_bid=2;
    let time = 15;
   // let countdown = setInterval(update, 1000);
   
    let countdown =setInterval(update,10000);
    
    function update() { 
    
    let min = Math.floor(time / 60); 
    let sec = time % 60; 
    
    sec = sec < 10 ? "0" + sec : sec;
    
    console.log(`${min}:${sec}`); 
    
    time--;
    if (min == 0 && sec == 0) {


    clearInterval(countdown);
    }
    }

/*
    console.log("Mqtt :")
    let msg = req.body.mqtt;
    console.log(msg);

const options = {
   // Clean session
   clean: true,
   //connectTimeout: 4000,
   // Authentication
   clientId: 'emqx_test',
   username: 'emqx_test',
   password: 'emqx_test',
}
/*
    const options = {
      port: 1883,
      host: 'broker.hivemq.com',
      clientId: 'myclient',
  };
  */
 /*
  const client = mqtt.connect(url,options);
    client.on("connect",function(){	
    console.log("connected");
    })
    
let pub_topic = 'bid/souma';

let pub_options = {qos:0, retain:true};
client.publish(pub_topic, msg, pub_options, function(err) {
            if(err) {
                console.log("An error occurred during publish")
            } else {
                console.log("Published successfully")
            }
        });
        */

     res.status(201).json({message:'mqtt '})
  
  }catch(err){
    if(!err.statusCode){
      err.statusCode=500;
      console.log(err);
    }  
    next(err);
    } 

 }
 
exports.findAll = async(req, res, next) => {
try {
const [alloffres] = await Bid.fetchAll();
res.status(200).json(alloffres);

}catch(err) {
    if(!err.statuscode){
        err.statuscode = 500
    }
    next(err);

    }
 
};    
exports.FindAllDetail = async(req, res, next) => {
  try {
    const id_offre=req.body.id_offre
        const [alloffres] = await Offre.fetchBid(id_offre);

        let TAB=[];
        for(var j=0;j<alloffres.length;j++)
        {
      
        let id_o=alloffres[j].id_offre;
        let prix_depart=alloffres[j].prix_depart;
        let status=alloffres[j].status;
        let desc_refuser=alloffres[j].desc_refuser;
        let id_produit=alloffres[j].id_produit;
        let [prod]= await Produit.fetchP(id_produit);
        console.log(prod[0])
        let titre=prod[0].titre;
        let description=prod[0].description;
        let prix_direct=prod[0].prix_direct;
        let id_client=prod[0].id_client;
        let vendu=prod[0].vendu; 
        let [bid]= await Bid.fetchByOffre(id_offre);
        console.log(bid[0])
         
        let id_bid=bid[0].id_bid;
        let date=bid[0].date;
        let heure=bid[0].heure;
        let frais_inscrit=bid[0].frais_inscrit;
        let nb_inscrit=bid[0].nb_inscrit;
        let TABImg=[];
        const [allimages] = await Produit.fetchAll(id_produit);
        for(var k=0;k<allimages.length;k++)
        {
          let url=allimages[k].url;
          console.log(url);
       
        TABImg.push(url);
        }
     console.log("ffffffffff");
        console.log(TABImg);
      let json = {
        id_bid:id_bid,
        date:date,
        heure:heure,
        frais_inscrit:frais_inscrit,
        nb_inscrit:nb_inscrit,
        id_offre:id_o,
        prix_depart:prix_depart,
        status:status,
        desc_refuser:desc_refuser,
        id_produit:id_produit,
        titre:titre,
        description:description,
        image:TABImg,
        prix_direct:prix_direct,
        id_client:id_client,
        vendu:vendu,
    
        
                  
      };
      
      TAB.push(json);
    }
      console.log(TAB)
    
    res.status(200).json(TAB);
    
  
  }catch(err) {
      if(!err.statuscode){
          err.statuscode = 500
      }
      next(err);
  
      }
   
  };    

 /*
 
final int id_bid;
final String date;
final String heure;
final int frais_inscrit;
final int id_offre;
final int prix_depart;
final String status;
final String desc_refuser;
final int id_produit;
final String titre;
final String description;
final String image;
final int prix_directe;
final int id_client;
final int vendu;*/

exports.findAllDate = async(req, res, next) => {
  try {
    let TAB=[];
    let json;
  const [alldates] = await Bid.fetchAllDate();
  for(var i=0;i<alldates.length;i++){
    console.log("dddd");
    console.log(alldates[i]);
    const [alloffres] = await Bid.fetchAllByD(alldates[i].date);

    TAB.push({"date":alldates[i].date ,"tab":alloffres});
  }
  console.log(TAB);
  res.status(200).json(TAB);
  
  }catch(err) {
      if(!err.statuscode){
          err.statuscode = 500
      }
      next(err);
  
      }
   
  };    


exports.postBid= async(req,res,next)=>{
    const errors= validationResult(req);
  
  try{
    console.log("ajouter bid :")
      console.log(req.body);
 
      let heure = req.body.heure;
      let date = req.body.date;
      let frais_inscrit = req.body.frais_inscrit;
      let id_offre = req.body.id_offre; 
     
  
  

     let result =await Bid.postB(heure,date,frais_inscrit,id_offre);

     res.status(201).json({message:'bid enregistrer'})
  
  }catch(err){
    if(!err.statusCode){
      err.statusCode=500;
      console.log(err);
    }  
    next(err);
    } 
  }
 
  exports.checkCode=async(req,res,next)=>{
    const errors= validationResult(req);

    try{
      
        console.log(req.body);
        
        let id_bid = req.body.id_bid;
        let id_client = req.body.id_client;
        let code_confirmation= req.body.code_confirmation;
 
    
       let coderes =await Bid.check(id_bid,id_client);
  
       let code=coderes[0].code_confirmation;
       console.log(code_confirmation)
       const msg="";
    if(code==code_confirmation )
    {
      msg="1";
      valide=1;
      let res =await Bid.valide(valide,id_bid,id_client);
     // let resq =await Bid.fetchBybid(id_bid);
      console.log("correct code ")
    }else
    {
     
      console.log("incorect code ")
    }
       res.status(201).json({message:msg})
    
    }catch(err){
      if(!err.statusCode){
        err.statusCode=500;
        console.log(err);
      }  
      next(err);
      } 
    }
    
    
    
    
    
exports.inscritBid= async(req,res,next)=>{
  const errors= validationResult(req);

try{
  
    console.log(req.body);

    let id_bid = req.body.id_bid;
    let id_client = req.body.id_client;
    let numero=req.body.numero;
    let code_confirmation= 10;


    const vv= new Vonage({
      
      applicationId:'a0f69cbf-9846-40ab-9e52-3f2dc9cabbfb',
      privateKey:'./private.key'
     });
     const textMessage = "votre code est :  ";
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
   
    


   let result =await Bid.postUser(id_bid,id_client,code_confirmation);

   res.status(201).json({message:'utilisateur inscrit avec succes'})

}catch(err){
  if(!err.statusCode){
    err.statusCode=500;
    console.log(err);
  }  
  next(err);
  } 
}




