import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../app';

const { expect } = chai;


chai.use(chaiHttp);

// eslint-disable-next-line no-undef
describe('POST /api/v1/auth/signup ', () => {
  it('should create a new user account', (done) => {
    const account = {
      id: 5,
      email: 'funmijohn@hotmail.com',
      firstName: 'Funmilola',
      lastName: 'John',
      password: 'fuDd3457',
      phoneNumber: '08039873675',
      isAdmin: 'NO',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(account)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res).to.have.status('201');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        expect(res.body.data).to.include.key('id');
        expect(res.body.data).to.include.key('email');
        expect(res.body.data).to.include.key('firstName');
        expect(res.body.data).to.include.key('lastName');
        expect(res.body.data).to.include.key('password');
        expect(res.body.data).to.include.key('phoneNumber');
        expect(res.body.data).to.include.key('isAdmin');
        done();
      });
  });

  it('should return an error if a user does not supply all information', (done) => {
    const account1 = {
      id: 6,
      email: '',
      firstName: '',
      lastName: 'John',
      password: 'fuDd3457',
      phoneNumber: '',
      isAdmin: 'NO',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(account1)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply all the information required!');
        done();
      });
  });

  it('should return an error if the email supplied is incorrect', (done) => {
    const account1 = {
      id: 5,
      email: 'funmijohnhotmail.com',
      firstName: 'Funmilola',
      lastName: 'John',
      password: 'fuDd3457',
      phoneNumber: '08039873675',
      isAdmin: 'NO',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(account1)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply a valid email!');
        done();
      });
  });

  it('should return an error if the names supplied are invalid', (done) => {
    const account1 = {
      id: 5,
      email: 'funmijohn@hotmail.com',
      firstName: 'Funmilola1',
      lastName: 'John',
      password: 'fuDd3457',
      phoneNumber: '08039873675',
      isAdmin: 'NO',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(account1)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply valid names!');
        done();
      });
  });

  it('should return an error if the phone number supplied is invalid', (done) => {
    const account1 = {
      id: 5,
      email: 'funmijohn@hotmail.com',
      firstName: 'Funmilola',
      lastName: 'John',
      password: 'fuDd3457',
      phoneNumber: '0803987367r',
      isAdmin: 'NO',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(account1)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply a valid phone number!');
        done();
      });
  });

  it('should return an error if the password supplied is invalid', (done) => {
    const account1 = {
      id: 5,
      email: 'funmijohn@hotmail.com',
      firstName: 'Funmilola',
      lastName: 'John',
      password: 'fuDd34579.',
      phoneNumber: '08039873675',
      isAdmin: 'NO',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(account1)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Your password must be only 8 characters and must include at least an upper case letter, lower case letter, and a number.');
        done();
      });
  });
});
