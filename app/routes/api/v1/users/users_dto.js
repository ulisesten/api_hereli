const auth = require('../../../../librerias/jwt/jwt.js');
//const encrypt = require('../../../../librerias/encrypt/encrypt.js');

class UsersDto {

    user_new_response(data) {
        if(!data)
            return {
                msg: 'Ocurrió un error al registrar al usuario.',
                success: false,
                error: 1
            }

        data = data[0];

        return {
            msg: data.msg,
            success: data.success,
            error: data.error
        }
    }

    user_update_response(data) {

        if(!data)
            return {
                msg: 'Ocurrió un error al actualizar al usuario.',
                success: false,
                error: 1
            }

        data = data[0];

        return {
            msg: data.msg,
            success: data.success,
            error: data.error
        }
    }


    user_auth_response(data) {
        if(!data || !data[0])
            return {
                msg: 'El usuario no existe o las credenciales son incorrectas.',
                success: false,
                error: 1
            }

        data = data[0];

        return {
            msg: data['msg'],
            success: data['success'],
            error: data['error'],
            data: {
                usu_id: data['usu_id'],
                usu_nombre: data['usu_nombre'],
                usu_correo: data['usu_correo'],
                token: auth.write_token( data ),
                gost_token: auth.write_gost_token( data ),
                testing_decrypt: auth.gost_verify(auth.write_gost_token( data ))
            }
        }
    }
}

module.exports = new UsersDto();