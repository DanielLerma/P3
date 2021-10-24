const { Db } = require('mongodb');
const UsersController = require('../controllers/users.controller');
const SessionController = require('../controllers/session.controller');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// para generar secret de jwt
const crypto = require('crypto');
const jwt_secret = crypto.randomBytes(32);

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/login', async (req, res) => {
    let b = req.body;
    if (b.userName && b.pwd) {
        // checar si existe userName
        let userExists = await UsersController.getUserByUserName(b.userName);
        if (userExists.length > 0) {
            // comparar con el hash hecho en sign up
            const cmp = await bcrypt.compare(b.pwd, userExists[0].pwd);
            userName = userExists[0].userName;
            // pwds == 
            if (cmp) {
                // gen token
                const token = jwt.sign({
                    id: userExists._id,
                    userName: userExists.userName
                }, jwt_secret);
                // postear la sesión activa de ESTE usuario
                await SessionController.postSession({ token, userName });
                res.send(token);
            }
            // pwds !=
            else {
                res.send('Invalid userName / password');
            }
        }
        else {
            res.send('Invalid userName / password');
        }
    }
    else {
        res.send('Info. missing');
    }
})

router.post('/register', async (req, res) => {
    let b = req.body;
    if (b.name && b.lastName && b.userName && b.email && b.pwd) {
        let existingUser = await UsersController.getUserByEmail(b.email);
        console.log(existingUser);
        if (existingUser.length > 0) {
            res.send('Not posssible to create');
        }
        else {
            b.pwd = await bcrypt.hash(b.pwd, 10);
            console.log(b)
            let newUser = await UsersController.createUser(b);
            try {
                res.send(newUser);
            } catch (err) {
                res.send(err).status(500);
            }
        }
    }
});

module.exports = router;