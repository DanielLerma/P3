const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) res.send('Invalid authorization');
        else {
            // console.log(token); 
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.log('error: ', err);
                    res.send('Invalid auth');
                } else {
                    console.log('token: ', decoded);
                    next();
                }
            });
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};

module.exports = auth;