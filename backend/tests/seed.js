const { ObjectID } = require('mongodb');
const { Tag } = require('../models/tag');

const tags = [
    {
        _id: new ObjectID(),
        uuid: '34794373045720482482',
        matid: 'mat1234567890'
    },
    {
        _id: new ObjectID(),
        uuid: '34794373045720684734',
        matid: 'mat1235385934'
    },
];

const populateTags = done => {
    Tag.remove({})
        .then(() => {
            return Tag.insertMany(tags);
        })
        .then(() => done()).catch(err => {
            debugger;
            console.log(err);
            done(err);
        })
};

module.exports = { tags, populateTags };
