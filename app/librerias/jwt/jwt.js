const jwt = require("jsonwebtoken");
const encrypt = require("../encrypt/encrypt.js");
const settings = require("../../core/configuration");

class AuthService {
  secret_key = settings.getSecretKey();

  /**
   * @brief Genera un token JWT
   * @param string Datos a codificar
   * @returns
   */

  write_token(data) {
    const credentials = settings.getCredentials();

    const fecha_exp =
      new Date().getTime() + settings.getExpirationDays() * 86400000;

    const payload = {
      id: credentials.usu_id,
      init: new Date().getTime(),
      exp: fecha_exp,
      user: {
        id: credentials.usu_id,
        usu_nombre: credentials.usu_nombre,
        correo: credentials.usu_correo,
      },
    };

    /* const options = {
            //expiresIn: settings.getExpirationDays() + 'd'
        }
        */

    return jwt.sign(payload, this.secret_key, null);
  }

  /**
   * @brief Decodifica un token JWT
   * @param data string, token a decodificar
   * @param cb function, callback
   */
  verify(token, cb) {
    jwt.verify(token, this.secret_key, (err, payload) => {
      if (err) {
        cb(null, err);
        return;
      }

      cb(payload, null);
    });
  }

  /**
   * @brief Genera un token GOST
   * @param string Datos a codificar
   * @returns string, datos codificados
   */
  write_gost_token(data) {
    const credentials = data || settings.getCredentials();

    const fecha_exp =
      new Date().getTime() + settings.getExpirationDays() * 86400000;

    const payload = {
      id: credentials.usu_id,
      init: new Date().getTime(),
      exp: fecha_exp,
      user: {
        id: credentials.usu_id,
        usu_nombre: credentials.usu_nombre,
        correo: credentials.usu_correo,
      },
    };

    return encrypt.reversible_encrypt(payload);
  }

  /**
   * @brief Decodifica un token GOST
   * @param data string, token a decodificar
   * @returns string
   */
  gost_verify(token) {
    const today = new Date().getTime();
    const dec_data = JSON.parse(encrypt.decrypt(token));

    if (today > dec_data.exp) return false;

    return dec_data;
  }

  /**
   * @brief Genera un hash de una contraseña
   * @param password contraseña a encriptar
   * @returns string, hash
   */
  generate_hash(password) {
    return encrypt.reversible_encrypt(password);
  }

  /**
   * @brief verifica la contraseña con el hash
   * @param password contraseña a verificar
   * @param hash hash almacenado de la contraseña
   * @returns bool si la contraseña es correcta retorna true
   */
  gost_hash_verify(password, hash) {
    //bEqual = false;
    const new_hash = encrypt.hash(password);

    if (hash.length != new_hash.length) return false;

    let i = 0;
    while (i < new_hash.length && hash[i] == new_hash[i]) {
      i += 1;
    }

    if (i != new_hash.length) return false;

    return true;
  }
}

module.exports = new AuthService();

// 30 * 86400000
