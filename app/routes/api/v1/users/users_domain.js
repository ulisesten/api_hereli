const encryptService = require("../../../../librerias/encrypt/encrypt.js");

class UsersDomain {

    user_authorization(req, res, next) {
        const authHeader = req.headers['authorization'];

        console.log('hi middleware')

        if (authHeader && authHeader.startsWith('Bearer ')) {
            // Extraer el token eliminando el prefijo 'Bearer '
            const token = authHeader.split(' ')[1];
            req.user = JSON.parse(encryptService.decrypt(token));
            req.authorized = true;
        } else {
            req.user = null; // Si no se encuentra el token, asignamos null
            req.authorized = false;
        }

        next();
    }
}

module.exports = new UsersDomain();