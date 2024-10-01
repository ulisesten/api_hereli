const { Router } = require("express");
const users = Router();
const usersDto = require("./users_dto.js");
const usersDomain = require("./users_domain.js");
const authService = require("../../../../librerias/authorization/authorization.js");
const sqlEject = require("../../../../librerias/sql_server/sql_eject.js");
const encryptService = require("../../../../librerias/encrypt/encrypt.js");


users.post("/", async function (req, res) {
  const body = req.body;

  const hashed_password = encryptService.hash(body.usu_contrasena);

  const parametros = {
    tipoRegistro: "USUARIO_REGISTRAR",
    usu_nombre: body.usu_nombre,
    usu_ape_paterno: body.usu_ape_paterno,
    usu_ape_materno: body.usu_ape_materno,
    usu_correo: body.usu_correo,
    usu_contrasena: hashed_password,
  };

  const db_res = await sqlEject.store_eject(
    "procUsersProc",
    parametros,
    "hereli_api",
  );
  res.json(usersDto.user_new_response(db_res));
});


users.put("/:usu_id", async function (req, res) {
  const body = req.body;

  const parametros = {
    tipoRegistro: "USUARIO_ACTUALIZAR",
    usu_nombre: body.usu_nombre,
    usu_ape_paterno: body.usu_ape_paterno,
    usu_ape_materno: body.usu_ape_materno,
    usu_correo: body.usu_correo,
  };

  const db_res = await sqlEject.store_eject(
    "procUsersProc",
    parametros,
    "hereli_api",
  );
  res.json(usersDto.user_update_response(db_res));
});


users.get("/", authService.authorize ,async function (req, res) {
  const parametros = {
    tipoConsulta: "USUARIOS_CONS",
  };

  console.log(encryptService.decrypt("44uK6IGt44usY0wEOxvji5zogLnKq+iBt+OAiQDjgLLogJnji5/ogbzji6XogbPjgIYZOuiBnsuUMculdAYcOeiBn8qV"))

  const db_res = await sqlEject.store_eject(
    "procUsersCons",
    parametros,
    "hereli_api",
  );
  res.json(usersDto.users_get_response(db_res));
});


users.post("/signin", async function (req, res) {
  const body = req.body;

  const parametros = {
    tipoConsulta: "USUARIO_SIGN_IN_CONS",
    usu_correo: body.usu_correo
  };

  const db_res = await sqlEject.store_eject("procUsersCons",parametros,"hereli_api");

  res.json(usersDto.user_signin_response(db_res, body.usu_contrasena));
});


module.exports = users;