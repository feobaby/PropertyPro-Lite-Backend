import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import sinonChai from 'sinon-chai';
import app from '../app';

chai.use(sinonChai);
const { expect } = chai;
const faker = require('faker');

chai.use(chaiHttp);

describe('POST /api/v1/auth/signup ', () => {
  it('should create a new user account', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({
        firstName: 'funmi',
        lastName: 'olaiya',
        email: faker.internet.email(),
        password: 'funmi.5H',
        phoneNumber: '08022000000',
        address: 'hyhhy',
      })
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
      .send({
        firstName: 'funmi',
        lastName: 'olaiya',
        email: faker.internet.email(),
        password: 'funmi.5H',
        confirmPassword: 'funmi.5H',
        phoneNumber: '08022000000',
        address: '',
      })
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
      .send({
        firstName: 'funmi',
        lastName: 'olaiya',
        email: 'funmi10gmail.com',
        password: 'funmi12666666',
        confirmPassword: 'funmi12666666',
        phoneNumber: '08022000000',
        address: 'hyhhy',
      })
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
      .send({
        email: 'TadeAde@gmail.com',
        firstName: 'Tad5',
        lastName: 'Aderenle7',
        password: 'TadeOgi8',
        phoneNumber: '08039867565',
        address: 'No. 4, Adesope Ileri Close, Lekki, Lagos',
        isadmin: 'false',
      })
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
      .send({
        email: 'TadeAde@gmail.com',
        firstName: 'Tade',
        lastName: 'Aderenle',
        password: 'TadeOgi8',
        phoneNumber: '08039867565r',
        address: 'No. 4, Adesope Ileri Close, Lekki, Lagos',
        isadmin: 'false',
      })
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
      .send({
        email: 'TadeAde@gmail.com',
        firstname: 'Tade',
        lastname: 'Aderenle',
        password: 'TadeOgi8yy',
        phonenumber: '08039867565',
        address: 'No. 4, Adesope Ileri Close, Lekki, Lagos',
        isadmin: 'false',
      })
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
      .send({
        firstName: 'funmi',
        lastName: 'olaiya',
        email: 'funmi10@gmail.com',
        password: 'Funm.126',
        phoneNumber: '08022000000',
        address: 'hyhhy',
      })
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
      .send({
        email: 'funmi10@gmail.com',
        password: 'funmi12666666',
      })
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
      .send({
        email: 'funmi10@gmail.com',
        password: '',
      })
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
      .send({
        email: 'funmi10000000@gmail.com',
        password: 'funmi12666666',
      })
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
      .send({
        email: 'funmi10@gmail.com',
        password: 'funmi126',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res).to.have.status('401');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        done();
      });
  });
});
