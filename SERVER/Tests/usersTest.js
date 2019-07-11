import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import Seed from './seed';
import db from '../DBconfig/index';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

before(async () => {
  const Users = 'DELETE FROM users';
  await db.query(Users);
});

// eslint-disable-next-line no-undef
describe('POST /api/v1/auth/signup ', () => {
  it('should create a new user account', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(Seed.account)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res).to.have.status('201');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        done();
      });
  });

  it('should return an error if a user does not supply an email', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(Seed.noEmail)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply an email!');
        done();
      });
  });

  it('should return an error if a user does not supply a first name', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(Seed.noFirstName)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply the first name!');
        done();
      });
  });

  it('should return an error if a user does not supply a last name', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(Seed.noLastName)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply the last name!');
        done();
      });
  });

  it('should return an error if a user does not supply a password', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(Seed.noPassword)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply the password!');
        done();
      });
  });

  it('should return an error if a user does not supply a phone number', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(Seed.noPhoneNumber)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply the phone number!');
        done();
      });
  });

  it('should return an error if a user does not supply an address', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(Seed.noAddress)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply the address!');
        done();
      });
  });

  it('should return an error if the admin status is not specified', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(Seed.noIsAdmin)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply this info!');
        done();
      });
  });

  it('should return an error if the email supplied is invalid', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(Seed.invalidEmail)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply a valid email!');
        done();
      });
  });

  it('should return an error if the firstname/ last name format supplied is wrong', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(Seed.noValidNames)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply valid name(s)!');
        done();
      });
  });

  it('should return an error if the phone number format supplied is wrong', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(Seed.noValidNumber)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply a valid phone number!');
        done();
      });
  });

  it('should return an error if the password format supplied is wrong', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(Seed.noValidPassword)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Your password must be only 8 characters and must include at least an upper case letter, lower case letter, and a number.');
        done();
      });
  });

  it('should return an error if the email has been registered before', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(Seed.account)
      .end((err, res) => {
        expect(res.status).to.be.equal(409);
        expect(res).to.have.status('409');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('OOPS! This particular email has already been registered!');
        done();
      });
  });
});
