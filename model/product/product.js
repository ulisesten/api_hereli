const { v4: uuidV4 } = require('uuid');
const ProductDAO = require('./ProductDAO');

class Product {

    constructor(pro_nombre, pro_descripcion, pro_proveedor, pro_precio, pro_cantidad){
        
        this.productDao = new ProductDAO(pro_nombre, pro_descripcion, pro_proveedor, pro_precio, pro_cantidad)
    }

    save(cb) {
        this.productDao.save(cb)
    }
}

module.exports = Product;