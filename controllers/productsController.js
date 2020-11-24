const fs = require ("fs");
let products = JSON.parse (fs.readFileSync (__dirname + "/../database/products.json"));
console.log (products);

const productsController = {
    create: function(req, res, next) {
        return res.render('createproduct');
      },
      store: function (req, res, next){
        products.push (req.body);
        fs.writeFileSync (__dirname + "/../database/products.json", JSON.stringify(products, null, 2));
        return res.send ("Producto " +req.body.name + " cargado")
      },
      edit: function (req, res, next){
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
      },
      editedproduct: function (req, res, next){
        for (let i = 0; i < products.length; i++) {
          if (products[i].id == req.body.id){
            products[i] = req.body;
          }
        }
        // Revisar
        products.push (req.body);
        fs.writeFileSync (__dirname + "/../database/products.json", JSON.stringify(products, null, 2));
        return res.redirect ("/products/edit/:id")

}
// module.exports = productsController;