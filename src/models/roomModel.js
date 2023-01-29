const db = require('../../util/database');
module.exports = class room {
    constructor(id_room,nom,prenom,current_value,id_bid,time_add){
        this.id_room = id_room;
        this.nom = nom;
        this.prenom = prenom;
        this.current_value = current_value;
        this.id_bid = id_bid; 
        this.time_add = time_add;
    
    } 

static getVal(id_bid){
    return db.execute(
        'SELECT * FROM room WHERE id_bid=? ',[id_bid]);
    
}
static postVal(nom,prenom,current_value,id_bid,time_add){

    return db.execute('UPDATE room SET nom=? , prenom=? ,current_value=?,time_add=? WHERE id_bid=?' ,
        
        [nom,prenom,current_value,time_add,id_bid]);
    
}
/*
static postVal(nom,prenom,current_value,id_bid,time_add){

        return db.execute('INSERT INTO room (nom,prenom,current_value,id_bid,time_add) VALUES (?,?,?,?,?)',
        [nom,prenom,current_value,id_bid,time_add]);
    
}*/

}