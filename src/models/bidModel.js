const db = require('../../util/database');
module.exports = class Bid {
    constructor(id_bid,heure,date,frais_inscrit,id_offre){
        this.id_bid = id_bid ;
        this.heure = heure;
        this.date = date;
        this.frais_inscrit = frais_inscrit;
        this.id_offre = id_offre; 
    
    } 

static fetchAll(){
    return db.execute(
        'SELECT * FROM bid ');
    
}

static fetchAllDate(){
    return db.execute(
        'SELECT date FROM bid GROUP BY date');
    
}
static fetchByOffre(id_offre){
    return db.execute(
        'SELECT * FROM bid where id_offre=?',[id_offre]);
    
}
static fetchBybid(id_bid){
    return db.execute(
        'SELECT * FROM bid where id_bid=?',[id_bid]);
    
}
static fetchAllByD(date){
    return db.execute(
        'SELECT * FROM bid where date=?',[date]);
    
}
static valide(v,id_bid,id_client){
    return db.execute(
        'UPDATE  user_bids  Set valide=? WHERE id_bid=? AND id_client=?',
        [v,id_bid,id_client]);
}
static check(id_bid,id_client){
    return db.execute(
        'SELECT code_confirmation FROM user_bids WHERE id_bid=? AND id_client=?',
        [id_bid,id_client]);
    
}

static postUser (id_bid,id_client,code_confirmation){

    return db.execute('INSERT INTO user_bids (id_bid,id_client,code_confirmation) VALUES (?,?,?)',
    [id_bid,id_client,code_confirmation]);
}
static postB (heure,date,frais_inscrit,id_offre){

    return db.execute('INSERT INTO bid (heure,date,frais_inscrit,id_offre) VALUES (?,?,?,?)',
    [heure,date,frais_inscrit,id_offre]);
}







}