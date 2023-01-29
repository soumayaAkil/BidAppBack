const db = require('../../util/database');
module.exports = class Offre {
    constructor(id_offre,prix_depart,status,desc_refuser){
        this.id_offre = id_offre ;
        this.prix_depart = prix_depart; 
        this.status = this.status;
        this.desc_refuser=this.desc_refuser
    
    } 

static fetchAll(){
    return db.execute(
        'SELECT * FROM offre ');
    
}


static fetchBid(id_offre){
    return db.execute(
        'SELECT * FROM offre  WHERE id_offre=?' ,[id_offre]);
    
}

static fetchStatus(status){
    return db.execute(
        'SELECT * FROM offre  WHERE status=?' ,[status]);
    
}
//static postO (titre,description,image,prix_depart,prix_direct,status,i,desc_refuser){
static postO (prix_depart,status,desc_refuser,id_produit){

    return db.execute('INSERT INTO offre (prix_depart,status,desc_refuser,id_produit) VALUES (?,?,?,?)',
   [ prix_depart,status,desc_refuser,id_produit]);
}
static putO(id_offre,status,desc_refuser){
    return db.execute('UPDATE offre SET status=? , desc_refuser=?  WHERE id_offre=?' ,[status,desc_refuser,id_offre]);
}






}