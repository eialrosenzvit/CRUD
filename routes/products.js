var express = require('express');
var router = express.Router();
var productsController = require ("../controllers/productsController");
const fs = require ("fs");
let products = JSON.parse (fs.readFileSync (__dirname + "/../database/products.json"));
console.log (products);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/create',productsController.create);
  
router.post('/create', productsController.store );

router.get('/edit/:id', productsController.edit );

router.post('/edit/:id', productsController.editedproduct); 

router.get('/delete/:id', productsController.delete);

  
module.exports = router;
