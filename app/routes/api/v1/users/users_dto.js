const jwt = require("../../../../librerias/jwt/jwt.js");
const encrypt = require("../../../../librerias/encrypt/encrypt.js");

class UsersDto {
  user_new_response(data) {
    if (!data)
      return {
        msg: "Ocurrió un error al registrar al usuario.",
        success: false,
        error: 1,
      };

    data = data[0];

    return {
      msg: data.msg,
      success: data.success,
      error: data.error,
    };
  }

  users_get_response(data) {
    if (!data)
      return {
        msg: "Ocurrió un error al consultar usuarios.",
        success: false,
        error: 1,
      };

    return {
      msg: data[0].msg,
      success: data[0].success,
      error: data[0].error,
      data: data
    };
  }

  user_update_response(data) {
    if (!data)
      return {
        msg: "Ocurrió un error al actualizar al usuario.",
        success: false,
        error: 1,
      };

    data = data[0];

    return {
      msg: data.msg,
      success: data.success,
      error: data.error,
    };
  }

  user_signin_response(data, password) {
    if (!data || !data[0])
      return {
        msg: "El usuario no existe.",
        success: false,
        error: 1,
      };

    data = data[0];
    const hash = data["usu_contrasena"];

    if (!jwt.gost_hash_verify(password, hash))
      return {
        msg: "No se autorizó el acceso.",
        success: false,
        error: 1,
      };

    console.log(data)

    return {
      msg: data["msg"],
      success: data["success"],
      error: data["error"],
      data: {
        usu_id: data["usu_id"],
        usu_nombre: data["usu_nombre"],
        usu_correo: data["usu_correo"],
        gost_token: jwt.write_gost_token(data)
      },
    };
  }
}

module.exports = new UsersDto();
