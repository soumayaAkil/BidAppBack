const Offre = require('../models/offreModel');
const Produit = require('../models/produitModel');
const{ validationResult } = require('express-validator');

 
exports.findAll = async(req, res, next) => {
try {
const [alloffres] = await Offre.fetchAll();


let TAB=[];
for(var j=0;j<alloffres.length;j++)
{
let TABImg=[];
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

const [allimages] = await Produit.fetchAll(id_produit);
for(var k=0;k<allimages.length;k++)
{
  let url=allimages[k].url;

TABImg.push(url);
}
console.log(TABImg)
let json = {
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

res.status(200).json(TAB);

}catch(err) {
    if(!err.statuscode){
        err.statuscode = 500
    }
    next(err);

    }
 
};

exports.findPret = async(req, res, next) => {
    try {
        const status="en cours";
        const [alloffres] = await Offre.fetchStatus(status);

        let TAB=[];
        for(var j=0;j<alloffres.length;j++)
        {
      
        let id_o=alloffres[j].id_offre;
        let prix_depart=alloffres[j].prix_depart;
        let desc_refuser=alloffres[j].desc_refuser;
        let id_produit=alloffres[j].id_produit;
        let [prod]= await Produit.fetchP(id_produit);
        console.log(prod[0])
        let titre=prod[0].titre;
        let description=prod[0].description;
        
        let prix_direct=prod[0].prix_direct;
        let id_client=prod[0].id_client;
        let vendu=prod[0].vendu; 
        const [allimages] = await Produit.fetchAll(id_produit);
        let TABImg=[];
        for(var k=0;k<allimages.length;k++)
        {
          let url=allimages[k].url;
          console.log(url);
        let jsonImg={
        url:url
        }
        TABImg.push(jsonImg);
        }
     console.log("ffffffffff");
        console.log(TABImg);
      let json = {
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
    
exports.findAccept = async(req, res, next) => {
    try {
        /*
              id_offre: json['id_offre'] as int,
      titre: json['titre'] as String,
      description: json['description'] as String,
      image: json['image'] as String,
      status: json['status'] as String,
      prix_depart: json['prix_depart'] as int,
      prix_directe: json['prix_direct'] as int,
      id_client: json['id_client'] as int,
      desc_refuser: json['desc_refuser'] as String,
      */
        const status="accepter";
    const [alloffres] = await Offre.fetchStatus(status);

    let TAB=[];
    for(var j=0;j<alloffres.length;j++)
    {
  
    let id_o=alloffres[j].id_offre;
    let prix_depart=alloffres[j].prix_depart;
    let desc_refuser=alloffres[j].desc_refuser;
    let id_produit=alloffres[j].id_produit;
    let [prod]= await Produit.fetchP(id_produit);
    console.log(prod[0])
    let titre=prod[0].titre;
    let description=prod[0].description;
    
    let prix_direct=prod[0].prix_direct;
    let id_client=prod[0].id_client;
    let vendu=prod[0].vendu; 
    let TABImg=[];
    const [allimages] = await Produit.fetchAll(id_produit);
    for(var k=0;k<allimages.length;k++)
    {
      let url=allimages[k].url;
  
    TABImg.push(url);
    }
    console.log(TABImg);
  let json = {
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
    
exports.findBid = async(req, res, next) => {
    try {
        const id_offre=req.body.id_offre;
    const [alloffres] = await Offre.fetchBid(id_offre);
    res.status(200).json(alloffres);
    
    }catch(err) {
        if(!err.statuscode){
            err.statuscode = 500
        }
        next(err);
    
        }
     
    };
exports.postOffre= async(req,res,next)=>{
    const errors= validationResult(req);
  
  try{
    
      const statu="en cours";
      const desc_refuser =" ";
      const vendu =0;
      console.log(req.body);
      const id_client=1;
 
      let titre = req.body.titre;
      let description = req.body.description;
      let prix_depart = req.body.prix_depart; 
      let prix_direct =req.body.prix_direct;
    
    
  

     let resultt =await Produit.postP (titre,description,prix_direct,id_client,vendu);
     const ress= await Produit.getid();
     rows = ress[0];
     id_prod=rows[0].maxIdProd;
     console.log(id_prod);

     //
     // add tp produit postP para vendu =0

     
     let result =await Offre.postO(prix_depart,statu,desc_refuser,id_prod);
     res.status(201).json({message:'Offre enregistrer'})
  
  }catch(err){
    if(!err.statusCode){
      err.statusCode=500;
      console.log(err);
    }  
    next(err);
    } 
  }
  exports.putOffre= async(req,res,next)=>{
    const errors= validationResult(req);
  
  try{
    
      
 
      let id_offre = req.body.id_offre;
      let status = req.body.status;
      let desc_refuser=req.body.desc_refuser;
      
      console.log(status);
  

     let result =await Offre.putO(id_offre,status,desc_refuser);

     res.status(201).json({message:'Offre enregistrer'})
  
  }catch(err){
    if(!err.statusCode){
      err.statusCode=500;
      console.log(err);
    }  
    next(err);
    } 
  }

