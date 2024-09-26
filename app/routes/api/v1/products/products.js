const { Router } = require('express');
const products = Router();
const Product = require('../../../../../model/product/product.js');

const producto = new Product;

products.get('/', function(req, res){

    producto.getAll(function (results) {
     
        res.json({message: 'success', result: results});

    });
    
});

products.post('/', function(req, res){

    producto.save( req.body, function(results){
        res.json({message: "success", result: results});
    });

});


products.put('/', function(req, res){
    producto.update( req.body.product, function(results){
        res.json({message: "success", result: results});
    });
});

products.delete('/:id', function(req, res){
    producto.delete( req.params.id, function(results){
        res.json({message: "success", result: results});
    });
});

module.exports = products;