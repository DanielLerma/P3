const express = require('express');
const app = express();
const router = express.Router();
const Database = require('./src/models/database');
const MongoClient = require('mongodb').MongoClient;
const userRoutes = require('./src/routes/userRoutes');
const apiRoutes = require('./src/routes/apiRoutes');
const mongoose = require("mongoose");

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

if (process.env.NODE_ENV === 'dev') {
    require('dotenv').config();
}

const port = process.env.PORT || 3000;

const swaggerOptions = {
    swaggerDefinition: {
        swagger: "2.0",
        info: {
            title: "Swagger Test API",
            description: "test api for swagger documentation",
            version: "1.0.0",
            servers: ['http://localhost:' + port], // puede venir del .env
            contact: {
                name: "DLE"
            }
        }
    },
    apis: ['app.js']
}

/**
* @swagger
* /users/get:
*  get:
*    description: endpoint used to get all users
*    responses:
*      200:
*        description: succes response - returns list of users in DB
*      400:
*        description: bad data request
*/

/**
* @swagger
* /users/get/:email:
*  get:
*    description: endpoint used to get user with specific email
*    responses:
*      200:
*        description: succes response - returns user that has that email
*      400:
*        description: bad data request
*/

/**
* @swagger
* /api/login:
*  post:
*    description: endpoint used to create a new user
*
*    parameters:
*      - in: body
*        name: user
*        description: The user to create
*        schema:
*          type: object
*          required:
*            - userName
*            - pwd
*          properties:
*            userName:
*              type: string
*            pwd:
*              type: string
*    responses:
*      200:
*        description: succes response - returns token
*      400:
*        description: bad data request
*/

/**
* @swagger
* /api/register:
*  post:
*    description: endpoint used to create a new user
*
*    parameters:
*      - in: body
*        name: user
*        description: The user to create
*        schema:
*          type: object
*          required:
*            - userName
*            - name
*            - lastName
*            - email
*            - pwd
*          properties:
*            userName:
*              type: string
*            name:
*              type: string
*            lastName:
*              type: string
*            pwd:
*              type: string
*            email:
*              type: string
*    responses:
*      200:
*        description: succes response - returns user that has that email
*      400:
*        description: bad data request
*/

mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use(router);
app.use('/users', userRoutes);
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log("Server is running at port ", port);
});

const swaggerDocs = swaggerJSDoc(swaggerOptions);
// quiero ver la interfaz sólo cuando llega esta url:
router.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocs))