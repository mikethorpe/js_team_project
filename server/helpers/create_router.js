const express = require('express');

const createRouter = function () {

    const router = express.Router();

    //INDEX
    router.get('/', (req, res) => {
        res.sendFile('index.html');
    });

    //SHOW

    //CREATE

    //UPDATE

    //DELETE

    return router;

};

module.exports = createRouter;
