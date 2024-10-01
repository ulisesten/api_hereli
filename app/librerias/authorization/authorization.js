const encryptService = require("../encrypt/encrypt.js");

class AuthorizationService {
    authorize(req, res, next) {
        const authHeader = req.headers['authorization'];

        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            res.json({
                success: false,
                error: 1,
                msg: 'No credentials are present.'
            });
            return;
        }

        const token = authHeader.split(' ')[1];
        req.user = JSON.parse(encryptService.decrypt(token));

        if(!req.user) {
            res.json({
                success: false,
                error: 1,
                msg: 'Authentication error.'
            });
            req.authorized = false;
            req.user = null; // Si no se encuentra el token, asignamos null
            return;
        }

        req.authorized = true;
    
        next();
    }
}

module.exports = new AuthorizationService();