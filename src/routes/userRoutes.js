const { Db } = require('mongodb');
const UsersController = require('../controllers/users.controller');
const router = require('express').Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', async (req, res) => {
    const users = await UsersController.getAllUsers();
    try {
        console.log(users)
        res.send(users);
    } catch (err) {
        res.send(err).status(500);
    }
});

router.get('/:email', async (req, res) => {
    let e = req.params.email.split('=')[1];
    let user = await UsersController.getUserByEmail({ email: e });
    if (user) {
        console.log(user);
        res.send(user);
    } else {
        console.log(user);
        res.send('No user found');
    }
});

module.exports = router;