const jwt = require('jsonwebtoken');
const SessionController = require('../controllers/session.controller');
const crypto = require('crypto');
const jwt_secret = crypto.randomBytes(32);

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // checar en tabla de sesiones
        const decodedToken = jwt.verify(token, jwt_secret);
        let session = await SessionController.getSessionByToken({ token: decodedToken });
        let isActive = session[0].isActive;
        if (1) {
            console.log('x')
            next();
        } else {
            res.send('Invalid token');
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};