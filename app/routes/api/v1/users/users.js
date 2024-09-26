const { Router } = require('express');
const users = Router();
const usersDto = require('./users_dto.js');
const sqlEject = require('../../../../librerias/sql_server/sql_eject.js');
const encryptService = require('../../../../librerias/encrypt/encrypt.js');

users.post('/', async function(req, res){

    const body = req.body;

    const parametros = {
        tipoRegistro: "USUARIO_REGISTRAR",
        usu_nombre: body.usu_nombre,
        usu_ape_paterno: body.usu_ape_paterno,
        usu_ape_materno: body.usu_ape_materno,
        usu_correo: body.usu_correo,
    }
    
    const db_res = await sqlEject.store_eject('procUsersProc', parametros, 'hereli_api');
    res.json( usersDto.user_new_response(db_res) );

});


users.put('/:usu_id', async function(req, res){
    
    const body = req.body;

    const parametros = {
        tipoRegistro: 'USUARIO_ACTUALIZAR',
        usu_nombre: body.usu_nombre,
        usu_ape_paterno: body.usu_ape_paterno,
        usu_ape_materno: body.usu_ape_materno,
        usu_correo: body.usu_correo,
    }

    const db_res = await sqlEject.store_eject('procUsersProc', parametros, 'hereli_api');
    res.json( usersDto.user_update_response(db_res) );

});


users.get('/', async function(req, res){

    const parametros = {
        tipoRegistro: 'USUARIO_CONSULTA'
    }

    const db_res = await sqlEject.store_eject('procUsersProc', parametros, 'hereli_api');
    res.json( usersDto.user_update_response(db_res) );

});


users.post('/auth', async function(req, res){

    const body = req.body;

    const parametros = {
        tipoConsulta: "USUARIO_AUTH_CONS",
        usu_correo: body.usu_correo,
    }
    
    const db_res = await sqlEject.store_eject('procUsersCons', parametros, 'hereli_api');
    res.json( usersDto.user_auth_response(db_res) );

});


module.exports = users;