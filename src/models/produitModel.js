const db = require('../../util/database');
module.exports = class Produit {
    constructor(id_produit,titre,description,image,prix_direct,vendu){
        this.id_produit = id_produit;
        this.titre = titre;
        this.description = description;
        this.image = image;
        this.prix_direct =prix_direct;
        this.vendu = this.vendu;
    
    } 


    static postP (titre,description,prix_direct,id_client,vendu){

        return db.execute('INSERT INTO produit (titre,description,prix_direct,id_client,vendu) VALUES (?,?,?,?,?)',
       [ titre,description,prix_direct,id_client,vendu]);
    }
    static fetchP (id_produit){

        return db.execute(
            'SELECT * FROM produit  WHERE id_produit=?' ,
       [ id_produit]);
    }
    static getid (){

        return db.execute(
            'SELECT max(id_produit) as maxIdProd FROM produit');
    }
    static postImageProd(imageProd,id_prod){
        
    return db.execute('INSERT INTO multimedia (url,id_produit) VALUES (?,?)' ,[imageProd,id_prod]);

    }
    static fetchAll (id_produit){

        return db.execute(
            'SELECT * FROM multimedia WHERE id_produit=? ',[id_produit]);
    }

}