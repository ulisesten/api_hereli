const jwt = require('jsonwebtoken');
const encrypt = require('../encrypt/encrypt.js');
const settings = require('../../core/configuration');

class AuthService {

    secret_key = settings.getSecretKey();


    write_token() {
        const credentials = settings.getCredentials();

        const fecha_exp = (new Date()).getTime() + settings.getExpirationDays() * 86400000;

        const payload = {
            id: credentials.usu_id,
            init: (new Date()).getTime(),
            exp: fecha_exp,
            user: {
                id: credentials.usu_id,
                usu_nombre: credentials.usu_nombre,
                correo: credentials.usu_correo
            }
        }

        const options = {
            //expiresIn: settings.getExpirationDays() + 'd'
        }

        return jwt.sign(payload, this.secret_key, options);
    }


    verify( token, cb ) {
        jwt.verify(token, this.secret_key, (err, payload) => {
            if (err) {
                cb(null,err)
                return;
            }
            
            cb(payload, null);
        });
    }


    write_gost_token() {
        const credentials = settings.getCredentials();

        const fecha_exp = (new Date()).getTime() + settings.getExpirationDays() * 86400000;

        const payload = {
            id: credentials.usu_id,
            init: (new Date()).getTime(),
            exp: fecha_exp,
            user: {
                id: credentials.usu_id,
                usu_nombre: credentials.usu_nombre,
                correo: credentials.usu_correo
            }
        }

        return encrypt.reversible_encrypt( payload );
    }


    gost_verify( token ) {
        const today = (new Date()).getTime();
        const dec_data = JSON.parse(encrypt.decrypt(token));

        if( today > dec_data.exp )
            return false;


        return dec_data;
    }
}

module.exports = new AuthService();

// 30 * 86400000