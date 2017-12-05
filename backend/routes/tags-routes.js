const { Tag } = require('../models/tag');

module.exports = (app) => {
    app.get('/tags', async (req, res) => {
        try {
            debugger;
            const tags = await Tag.find({});
            res.status(200).send(tags);
        } catch (err) {
            res.status(400).send(err);
        }
    });
};


