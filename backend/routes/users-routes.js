const { User } = require('../models/user');
const _ = require('lodash');

module.exports = (app) => {
    app.post('/users', async (req, res) => {
        try {
            var body = _.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'clientId']);
            var user = new User(body);
            await user.save();
            const token = await user.generateAuthToken();
            res.status(200).send(token);
        } catch (err) {
            res.status(400).send(err);
        }
    });
};
