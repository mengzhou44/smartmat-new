require('./config/config');

const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');

const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
//const { authenticate } = require('./middleware/authenticate');

const app = express();
app.use(bodyParser.json());

require('./routes/tags-routes')(app);
require('./routes/clients-routes')(app);
require('./routes/users-routes')(app);


app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello, World!</h1>');

});


app.listen(process.env.PORT, () => {
    console.log(`Server is runnong on port ${process.env.PORT}`);
});


module.exports = { app };
