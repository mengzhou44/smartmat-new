const { Client } = require('../models/client');
const _ = require('lodash');

module.exports = (app) => {
    app.post('/clients', async (req, res) => {
        try {
            var body = _.pick(req.body, ['name']);
            var client = new Client({ name: body.name });
            await client.save();
            res.status(200).send(client);
        } catch (err) {
            res.status(400).send(err);
        }
    });
};
