const { Db } = require('mongodb');
const DGController = require('../controllers/discussion_group.controller');
const auth = require('../middleware/auth');
const groupAuth = require('../middleware/groupAuth');
// const auth = require('../middleware/auth');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

require('dotenv').config();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

// para crear un grupo se debe de estar loggeado (auth normal)
router.post('/', auth, async (req, res) => {
    const title = req.body.title;
    // arreglo de usuarios
    user.push(req.body.username);
    try {
        const group = await DGController.postGroup({ title: title, owner: req.body.username, users: user, dateAdded: Date() });
        console.log(group);
        res.send(`localhost:${process.env.PORT || 3000}/discussion-group/${title}`);
    } catch (err) {
        console.log('error');
        res.send(err).status(500);
    }
});

// para ver mensajes de un grupo esp., se necesita 1. estar loggeado, 2. pertenecer al grupo
router.get('/:gp', groupAuth, async (req, res) => {
    const title = req.params.gp.split('=')[1];
    try {
        const messages = await DGController.getMessages(title);
        res.send(messages);
    } catch (e) {
        res.send(err);
    }
});

// para escribir mensajes en el grupo se necesita 1. estar loggeado, 2. pertencer al grupo
router.post('/:gp', groupAuth, async (req, res) => {
    const message = req.body.message;
    // creador del msj
    const user = req.user;
    const dateAdded = Date();
    let newMsg = { message, dateAdded, user };
    const title = req.params.gp.split('=')[1];
    try {
        let prvMsgs = await DGController.getMessages(title);
        prvMsgs.push(newMsg);
        const messages = await DGController.postMessages(prvMsgs, title);
        res.send(messages);
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;