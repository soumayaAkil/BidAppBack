const db = require('../../util/database');
module.exports = class Client {
    constructor(id_client,nom,prenom,adresse,numero){
        this.id_client = id_client;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.numero = numero; 
    
    } 

static fetchAll(){
    return db.execute(
        'SELECT * FROM client ');
    
}

}