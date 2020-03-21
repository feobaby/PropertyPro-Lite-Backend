import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import sinonChai from 'sinon-chai';
import Seed from '../models/seed';
import app from '../app';

chai.use(sinonChai);
const { expect } = chai;

const {
  account, signIn, incompleteSignInDetails, wrongEmail, wrongPassword,
  incompleteFields, invalidEmail,
  noValidNames, noValidNumber, noValidPassword,
} = Seed;

chai.use(chaiHttp);

describe('POST /api/v1/auth/signup ', () => {
  it('should create a new user account', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(account)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res).to.have.status('201');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        done();
      });
  });

  it('should return an error if a user does not supply the required fields', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(incompleteFields)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply the required fields!');
        done();
      });
  });

  it('should return an error if the email supplied is invalid', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(invalidEmail)
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
      .send(noValidNames)
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
      .send(noValidNumber)
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
      .send(noValidPassword)
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
      .send(account)
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


describe('POST /api/v1/auth/signin ', () => {
  it('should login a user', (done) => {
    request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(signIn)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('token');
        done();
      });
  });
  it("should return an error if email/password isn't supplied", (done) => {
    request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(incompleteSignInDetails)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('No username or password!');
        done();
      });
  });
  it('should return an error if an invalid email is supplied', (done) => {
    request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(wrongEmail)
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res).to.have.status('401');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        done();
      });
  });
  it('should return an error if an invalid password is supplied', (done) => {
    request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(wrongPassword)
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res).to.have.status('401');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        done();
      });
  });
});
