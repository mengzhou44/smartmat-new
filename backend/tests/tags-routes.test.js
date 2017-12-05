const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../index');

const { tags, populateTags } = require('../tests/seed');

beforeEach(populateTags);

describe('GET /tags', () => {
    it('should get a tags list', done => {
        request(app)
            .get('/tags')
            .expect(200)
            .expect(res => {
                expect(res.body.length).toBe(2);
                expect(res.body[0].text).toBe(tags[0].text);
            })
            .end(done);
    });
});
