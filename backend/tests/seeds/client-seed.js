const { ObjectID } = require('mongodb');
const { Client } = require('../../models/client');
const { User } = require('../../models/user');

const clients = [
    {
        _id: new ObjectID(),
        name: 'Cenovous'
    }
];

const users = [
    {
        _id: new ObjectID(),
        firstName: 'Daniel',
        lastName: 'Zhou',
        email: 'mengzhou44@gmail.com',
        password: 'password',
        clientId: clients[0]._id
    },
    {
        _id: new ObjectID(),
        firstName: 'Richard',
        lastName: 'Otte',
        email: 'rko@wsr.com',
        password: 'password',
        clientId: clients[0]._id
    }
];

const populateClients = done => {
    Client.remove({})
        .then(() => {
            return Client.insertMany(clients);
        })
        .then(() => done()).catch(err => {
            console.log(err);
            done(err);
        })
};

const populateUsers = done => {
    User.remove({})
        .then(() => {
            return User.insertMany(users);
        })
        .then(() => done()).catch(err => {
            console.log(err);
            done(err);
        })
};

const fakeUser = {
    _id: new ObjectID(),
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'firstName@gmail.com',
    password: 'password',
    clientId: clients[0]._id
};

module.exports = { clients, users, fakeUser, populateClients, populateUsers };
