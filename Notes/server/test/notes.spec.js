const request = require('supertest'), app = require('../app'), config = require('./test.config'), expect = require('chai').expect, modules = require('../modules');
const jwt = require('../api/jwt'), secret = require('../config').JWT_SECRET, expiry = require('../config').TOKEN_EXPIRE;
const NoteModel = require('../api/v1/notes/notes.entity').notesModel, user_1_payload = require('./test.config').user_1_payload, user_2_payload = require('./test.config').user_2_payload, user_3_payload = require('./test.config').user_3_payload;
const BASE_PATH = '/api/v1/notes', note1 = config.note1, note2 = config.note2, updateNote1 = config.updateNote1, noteId = config.noteId, USER_ID_1 = '1', USER_ID_2 = '2', USER_ID_3 = '3';

let token_1, token_2, token_3;

before(done => {
    jwt.signToken(user_1_payload, secret, expiry, (error, token) => {
        token_1 = token;
    });
    done();
});

before(done => {
    jwt.signToken(user_2_payload, secret, expiry, (error, token) => {
        token_2 = token;
    });
    done();
});

before(done => {
    jwt.signToken(user_3_payload, secret, expiry, (error, token) => {
        token_3 = token;
    });
    done();
});

before(done => {
    modules.initializeMongooseConnection()
        .then(() => done())
});

before(done => {
    NoteModel.remove({})
        .then(() => done());
});

describe('Test to add a note', function () {
  it('Should handle request to add a new note for user 1', function (done) {
    request(app)
        .post(`${BASE_PATH}?userId=${USER_ID_1}`)
        .set('Authorization', `Bearer ${token_1}`)
        .send(note1)
        .expect(201)
        .end((error, response) => {
            expect(error).to.be.equal(null | undefined);
            expect(response.body.text).to.be.equal(note1.text);
        });
    done();
  });

  it('Should handle request to add a new note for user 2', function (done) {
    request(app)
        .post(`${BASE_PATH}?userId=${USER_ID_2}`)
        .set('Authorization', `Bearer ${token_2}`)
        .send(note2)
        .expect(201)
        .end((error, response) => {
            expect(error).to.be.equal(null | undefined);
            expect(response.body.text).to.be.equal(note2.text);
        });
      done();
  });
});

describe('Test to get notes', function () {
  it('Should handle request to get notes of user 1', function (done) {
    request(app)
        .get(`${BASE_PATH}?userId=${USER_ID_1}`)
        .set('Authorization', `Bearer ${token_1}`)
        .expect(200)
        .end((error, response) => {
            expect(error).to.be.equal(null | undefined);
            expect(response.body).to.be.not.equal(undefined | null);
        });
    done();
  });

  it('Should handle request to get notes of user 2', function (done) {
    request(app)
        .get(`${BASE_PATH}?userId=${USER_ID_2}`)
        .set('Authorization', `Bearer ${token_2}`)
        .expect(200)
        .end((error, response) => {
            expect(response.text).to.be.not.equal(undefined | null);
            expect(error).to.be.equal(null | undefined);
        });
    done();
  });

  it('Should handle request to get notes of a user who doesnt have any', function (done) {
    request(app)
        .get(`${BASE_PATH}?userId=${USER_ID_3}`)
        .set('Authorization', `Bearer ${token_3}`)
        .expect(200)
        .end((error, response) => {
            expect(response.body.length).to.be.equal(0);
            expect(error).to.be.equal(null | undefined);
        });
    done();
  });

    it('Should handle request to search a note by title', function(done) {
        request(app)
            .get(`${BASE_PATH}/search/:title`)
            .send('Authorization', `Bearer ${token_1}`)
            .expect(200)
            .end((error, response) => {
                expect(response.body).to.be.not.equal(null | undefined);
                expect(error).to.be.equal(null | undefined);
            });
        done();
    });
});

describe('Test to update a note', function () {
  it('Should handle request to update a note by id', function (done) {
    request(app)
        .put(`${BASE_PATH}/${noteId}`)
        .set('Authorization', `Bearer ${token_1}`)
        .send(updateNote1)
        .expect(200)
        .end((error, response) => {
            expect(response.body.text).to.be.equal(updateNote1.text);
            expect(error).to.be.equal(null | undefined);
        });
    done();
  });
});