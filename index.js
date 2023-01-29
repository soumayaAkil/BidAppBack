const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ports = process.env.PORT || 6000;
const clientRoutes = require('./src/routes/clientRoute');
const offreRoutes = require('./src/routes/offreRoute');
const bidRoutes = require('./src/routes/bidRoute');
const roomRoutes=require('./src/routes/roomRoute');

const imageController = require("./src/Controllers/imageControllers");
var multer, storage, path, crypto;
multer = require('multer')
path = require('path');
crypto = require('crypto')
app.use(bodyParser.json());
app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST ,PUT , DELETE');
res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
next();
});
app.use('/client',clientRoutes);
app.use('/offre',offreRoutes);
app.use('/bid',bidRoutes);
app.use('/room',roomRoutes);

var fs = require('fs');

storage = multer.diskStorage({
    destination: './images/',
    filename: function(req, file, cb) {
      console.log(file)
      return crypto.pseudoRandomBytes(16, function(err, raw) {
        if (err) {
          return cb(err);
        }
        return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
      });
    }
  });

/*
const upload = multer({
  destination: './images/',

});
*/
app.post("/sms",imageController.sendSMS);
app.post("/upload",multer({storage:storage}).single('upload'),imageController.postPicture);
//({  storage: storage }).single('upload')
/*
app.get("/upload",upload.single('upload'),imageController.postPicture);
//app.post("/uploadLogo",upload.single('file'),imageController.postLogo);

app.get('/images/:upload', function (req, res){
  file = req.params.upload;
 
  var img = fs.readFileSync(__dirname + "/images/" + file);
  res.writeHead(200, {'Content-Type': 'image/png' });
  res.end(img, 'binary');

});
*/


app.use('/upload/',express.static('./images'));


app.listen(ports, () => console.log('listenning on port '+ ports));


//test 

  /*

app.use('/uploads', express.static(__dirname + '/uploads'));
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
app.post('upload', upload.single('images'), async (req, res, next) => {


  let data = { companyName: req.body['companyName'],id:req.body['id'], imageUrl: req.file.path };

  let sql = `INSERT INTO DataTable SET ? `;
  
  db.query(sql, data, (insertionErr, insertionResult) => {
  if (insertionErr) {
  console.log(insertionErr);
  throw insertionErr;
  }
  else {
  console.log(insertionResult);
  res.send(insertionResult);
  }
  
  });
  
 
  
  });
 */