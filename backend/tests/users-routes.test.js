const expect = require('expect');
const request = require('supertest');

const { app } = require('../index');
const { Client } = require('../models/client');
const { User } = require('../models/user');

const { fakeUser, users, populateUsers, clients, populateClients } = require('./seeds/client-seed');

beforeEach(() => {
    populateClients();
    populateUsers();
});

describe('POST /user', () => {
    it('should not create an user if email is invalid', (done) => {

        request(app)
            .post('/users')
            .send({ email: 'meng@eeer' })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                User.find({})
                    .then(clients => {
                        expect(users.length).toBe(2);
                        done();
                    })
                    .catch(e => done(e));
            });
    }),

        it('should not create an user if clientId is empty', (done) => {
            request(app)
                .post('/users')
                .send({ email: 'meng@eeer' })
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    User.find({})
                        .then(clients => {
                            expect(users.length).toBe(2);
                            done();
                        })
                        .catch(e => done(e));
                });
        }),


        it('should able to create a client', (done) => {
            const name = clients[0].name;
            request(app)
                .post('/clients')
                .send({ name })
                .expect(200)
                .expect(res => {
                    expect(res.body.name).toBe(name);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    Client.findOne({ name })
                        .then(client => {
                            expect(client.name).toBe(name);
                            done();
                        })
                        .catch(e => done(e));
                });
        })
});
