const { Db } = require('mongodb');
const DGController = require('../controllers/users.controller');
// const auth = require('../middleware/auth');
const router = require('express').Router();
const crypto = require('crypto');
const jwt_secret = crypto.randomBytes(32);

const bodyParser = require('body-parser');
router.use(bodyParser.json());

const auth = async (req, res, next) => {
    console.log('in');
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        // checar en tabla de sesiones
        const decodedToken = jwt.verify(token, jwt_secret);
        console.log(decodedToken);
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

router.post('/', auth, async (req, res) => {
    res.send('hey, u');
    // const users = await UsersController.getAllUsers();
    // try {
    //     console.log(users)
    //     res.send(users);
    // } catch (err) {
    //     console.log('error');
    //     res.send(err).status(500);
    // }
});

module.exports = router;