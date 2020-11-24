var express = require('express');
var router = express.Router();
// var productsController = require ("../controllers/productsController");
const fs = require ("fs");
let products = JSON.parse (fs.readFileSync (__dirname + "/../database/products.json"));
console.log (products);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/create', function(req, res, next) {
  return res.render('createproduct')});
  
router.post('/create', function (req, res, next){
  products.push (req.body);
  fs.writeFileSync (__dirname + "/../database/products.json", JSON.stringify(products, null, 2));
  return res.send ("Producto " +req.body.name + " cargado")});

router.get('/edit/:id', function (req, res, next){
        let productToEdit;
        for (let i=0 ; i<= products.length ; i++) {
          if(products[i].id == req.params.id){
            productToEdit = products[i];
            break;
          }
        }
        if (productToEdit){
          return res.render ('editProduct' , {productToEdit} );
        }else {
          return res.send ("El id " + req.params.id + " no  coincide con ningun producto");
        }
      });
router.post('/edit/:id', function (req, res, next){
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == req.body.id){
      products[i] = req.body;
    }
  }
  // Revisar
  products.push (req.body);
  fs.writeFileSync (__dirname + "/../database/products.json", JSON.stringify(products, null, 2));
  return res.redirect ("/products/edit/" + req.body.id);

});

module.exports = router;
