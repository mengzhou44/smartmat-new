const expect = require('expect');
const request = require('supertest');

const { app } = require('../index');
const { Client } = require('../models/client');
const { User } = require('../models/user');

const { fakeUser, users, populateUsers, clients, populateClients } = require('./seeds/client-seed');


beforeEach(populateClients);
beforeEach(populateUsers);

describe('POST /user', () => {
    it('should not create an user if email is invalid', (done) => {
        let user = Object.assign({}, fakeUser);
        user.email = 'meng@eeer';
        request(app)
            .post('/users')
            .send(user)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                User.find({})
                    .then(users => {
                        expect(users.length).toBe(2);
                        done();
                    })
                    .catch(e => done(e));
            });
    }),

        it('should not create an user if clientId is empty', (done) => {
            let user = Object.assign({}, fakeUser);
            user.clientId = ''
            request(app)
                .post('/users')
                .send(user)
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

        it('should create an user', (done) => {
            let user = Object.assign({}, fakeUser);
            request(app)
                .post('/users')
                .send(user)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    User.find({})
                        .then(users => {
                            expect(users.length).toBe(3);
                            done();
                        })
                        .catch(e => done(e));
                });
        })

}); 
