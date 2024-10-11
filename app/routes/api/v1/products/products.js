const { Router } = require("express");
const users = Router();
const productsDto = require("./products_dto.js");
//const authService = require("../../../../librerias/authorization/authorization.js");
const sqlEject = require("../../../../librerias/sql_server/sql_eject.js");
//const encryptService = require("../../../../librerias/encrypt/encrypt.js");


users.post("/", async function (req, res) {
    const body = req.body;

    const parametros = {
        tipoRegistro: "PRODUCTO_GUARDAR",
        pro_nombre: body.pro_nombre,
        pro_descripcion: body.pro_descripcion,
        pro_com_precio: body.pro_com_precio,
        pro_ven_precio: body.pro_ven_precio,
        pro_cod_barras: body.pro_cod_barras,
        pro_imagenes: body.pro_imagenes
    };

    const db_res = await sqlEject.store_eject(
        "procProductsProc",
        parametros,
        "hereli_api",
    );
    res.json(productsDto.product_new_response(db_res));
});


users.put("/:pro_id", async function (req, res) {
    const body = req.body;

    const parametros = {
        tipoRegistro: "PRODUCTO_ACTUALIZAR",
        pro_nombre: body.pro_nombre,
        pro_descripcion: body.pro_descripcion,
        pro_com_precio: body.pro_com_precio,
        pro_ven_precio: body.pro_ven_precio,
        pro_cod_barras: body.pro_cod_barras,
        pro_images: body.pro_images
    };

    const db_res = await sqlEject.store_eject(
        "procProductsProc",
        parametros,
        "hereli_api",
    );
    res.json(productsDto.product_update_response(db_res));
});


users.get("/", async function (req, res) {
    const parametros = {
        tipoConsulta: "PRODUCTOS_CONS"
    };

    const db_res = await sqlEject.store_eject(
        "procProductsCons",
        parametros,
        "hereli_api",
    );
    res.json(productsDto.products_get_response(db_res));
});

users.get("/search", async function (req, res) {
    const params = req.query
    const parametros = {
        tipoConsulta: "PRODUCTOS_BUSCAR",
        pro_nombre: params.pro_nombre 
    };

    const db_res = await sqlEject.store_eject(
        "procProductsCons",
        parametros,
        "hereli_api",
    );
    res.json(productsDto.products_get_response(db_res));
});

users.get("/:pro_id", async function (req, res) {
    const parametros = {
        tipoConsulta: "PRODUCTO_DETALLES_CONS",
        pro_id: req.params.pro_id
    };

    const db_res = await sqlEject.store_eject(
        "procProductsCons",
        parametros,
        "hereli_api",
    );
    res.json(productsDto.product_detail_get_response(db_res));
});


users.delete("/:pro_id", async function (req, res) {
    const body = req.body;

    const parametros = {
        tipoConsulta: "USUARIO_ELIMINAR",
        //pro_id: body.usu_corre
    };

    const db_res = await sqlEject.store_eject("procProductsCons",parametros,"hereli_api");

    res.json(productsDto.product_delete_response(db_res));
});


module.exports = users;