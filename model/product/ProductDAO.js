const Connection = require('../connectionV2.js');
const { v4: uuidV4 } = require('uuid');

class ProductDAO {
    constructor(pro_nombre, pro_descripcion, pro_proveedor, pro_precio, pro_cantidad){
        this.connection = new Connection();
        this.connection.connect();

        this.table_name = 'cat_productos';
        this.pro_nombre = pro_nombre
        this.pro_descripcion = pro_descripcion
        this.pro_proveedor = pro_proveedor
        this.pro_precio = pro_precio
        this.pro_cantidad = pro_cantidad
    }

    save(cb){
        try{
            this.conn.getConnection()
                .query(
                    `INSERT INTO ${this.table_name}
                    (
                        pro_nombre,
                        pro_descripcion,
                        pro_proveedor,
                        pro_precio,
                        pro_cantidad
                    ) VALUES(
                        "${this.pro_nombre}",
                        "${this.pro_descripcion}",
                        "${this.pro_proveedor}",
                        "${this.pro_precio}",
                        "${this.pro_cantidad}");`,
                function (error, result, fields) {
                    if (error) {
                        cb({
                            success: false,
                            error: 1,
                            msg: error
                        });
                        
                        return;
                    }

                    cb({
                        success: true,
                        error: 0,
                        msg: exception,
                        result: result,
                        campos: fields
                    });
            });

        } catch(exception) {
            cb({
                success: false,
                error: 1,
                msg: exception
            });

        }
    }

    update(producto, cb){
        try{
            this.conn.getConnection().query(
               `UPDATE ${this.table_name}
                SET
                    pro_nombre='${producto.pro_nombre}',
                    pro_descripcion='${producto.pro_descripcion}',
                    pro_proveedor='${producto.pro_proveedor}',
                    pro_precio='${producto.pro_precio}',
                    pro_cantidad='${producto.pro_cantidad}'
                WHERE
                    pro_id="${producto.pro_id}";`
            , function (error, results, fields) {
                if (error) throw error;
                cb(results);
            });

        } catch(exception) {

            console.log('ProductDAO Exception:', exception);
            cb([]);

        }
    }

    getOne(pro_id, cb){
        try{
            this.connection
            .getConnection()
            .query(
               `SELECT
                    *
                FROM
                    ${this.table_name}
                WHERE
                    pro_id="${pro_id}"`
            , function (error, results, fields) {
                if (error) throw new Error(error);
                cb(results);
            });

        } catch(exception) {

            console.log('ProductDAO Exception:', exception);
            cb([]);

        }
    }

    getAll(cb){
        try{
            this.connection
            .getConnection()
            .query(
               `SELECT
                    *
                FROM
                    ${this.table_name}`
            
            , function (error, results, fields) {
                if (error) throw new Error(error);
                cb(results);
            });

        } catch(exception) {

            console.log('ProductDAO Exception:', exception);
            cb([]);

        }
    }

    delete(id, cb){
        try{
            this.connection
            .getConnection()
            .query(
               `DELETE FROM
                    ${this.table_name}
                WHERE
                    pro_id="${id}"`
                    
            , function (error, results, fields) {
                if (error) throw new Error(error);
                cb(results);
            });

        } catch(exception) {

            console.log('ProductDAO Exception:', exception);
            cb({});

        }
    }


    setInfo(table_name){
        this.connection.connect();
    }

    createTable(){
        this.connection.getConnection().query(`CREATE TABLE ${this.table_name} (idProduct varchar(36) not null, product_desc varchar(10), length double, manufacturer varchar(64), price double, image_url varchar(512), primary key(idProduct));`);
    }

}

module.exports = ProductDAO;