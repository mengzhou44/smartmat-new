const expect = require('expect');
const request = require('supertest');

const { app } = require('../index');
const { Client } = require('../models/client');

const { clients, populateClients } = require('./seeds/client-seed');

beforeEach(populateClients);

describe('POST /clients', () => {
    it('should not create a client if name is invalid', (done) => {
        request(app)
            .post('/clients')
            .send({ name: '' })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Client.find({})
                    .then(clients => {
                        expect(clients.length).toBe(1);
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
