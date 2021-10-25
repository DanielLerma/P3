const DGController = require('../controllers/discussion_group.controller');
const SessionController = require('../controllers/session.controller');
const jwt = require('jsonwebtoken');

const groupAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) res.send('Invalid authorization');
        else {
            // console.log(token); 
            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if (err) {
                    console.log('error: ', err);
                    res.send('Invalid auth');
                } else {
                    const title = req.params.gp.split('=')[1];
                    let grupo = await DGController.getGroupByTitle(title);
                    let newUsers = grupo.users;
                    // buscar user con base en en token
                    let user = await SessionController.getSessionByToken(token);
                    user = user.userName;
                    // comparar si ya está dentro del grupo o no
                    if (newUsers.includes(user)) {
                        // mandamos al user
                        req.user = (user);
                        next();
                    }
                    else {
                        // agregar usuario actual a arr y hacer update
                        newUsers.push(user);
                        try {
                            let usrs = await DGController.addUser(newUsers, title);
                            if (usrs) {
                                req.user = (user);
                                next();
                            }
                            else {
                                res.send('Couldnt add user');
                            }
                        } catch (e) {
                            res.send(e);
                        }
                    }
                }
            });
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};

module.exports = groupAuth;