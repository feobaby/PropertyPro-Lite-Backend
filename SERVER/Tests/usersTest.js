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
      email: 'funmijohn@hotmail.com',
      firstName: 'Funmilola',
      lastName: 'John',
      password: 'fuDd3457',
      phoneNumber: '08039873675',
      isAdmin: 'false',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(account)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res).to.have.status('201');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        done();
      });
  });

  it('should return an error if a user does not supply all information', (done) => {
    const account1 = {
      email: '',
      firstName: '',
      lastName: 'John',
      password: 'fuDd3457',
      phoneNumber: '',
      isAdmin: 'false',
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
      email: 'funmijohnhotmail.com',
      firstName: 'Funmilola',
      lastName: 'John',
      password: 'fuDd3457',
      phoneNumber: '08039873675',
      isAdmin: 'false',
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
      email: 'funmijohn@hotmail.com',
      firstName: 'Funmilola1',
      lastName: 'John',
      password: 'fuDd3457',
      phoneNumber: '08039873675',
      isAdmin: 'false',
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
      email: 'funmijohn@hotmail.com',
      firstName: 'Funmilola',
      lastName: 'John',
      password: 'fuDd3457',
      phoneNumber: '0803987367r',
      isAdmin: 'false',
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
      email: 'funmijohn@hotmail.com',
      firstName: 'Funmilola',
      lastName: 'John',
      password: 'fuDd34579.',
      phoneNumber: '08039873675',
      isAdmin: 'false',
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

  it('should return an error if the email is has been registered', (done) => {
    const account1 = {
      email: 'funmijoseph@hotmail.com',
      firstName: 'Funmi',
      lastName: 'Olaiya',
      password: 'Funmi111',
      phoneNumber: '08065687887',
      isAdmin: 'false',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(account1)
      .end((err, res) => {
        expect(res.status).to.be.equal(409);
        expect(res).to.have.status('409');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Sorry, this email has already been registered!');
        done();
      });
  });
});

describe('POST /api/v1/auth/signin ', () => {
  it('a user should login', (done) => {
    const account = {
      email: 'funmijoseph@hotmail.com',
      password: 'Funmi111',
    };
    request(app)
      .post('/api/v1/auth/signin')
      .send(account)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        expect(res.body).to.include.key('token');
        done();
      });
  });

  it('should return an error if a user does not supply all information', (done) => {
    const account1 = {
      email: '',
      password: '',
    };
    request(app)
      .post('/api/v1/auth/signin')
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
  it('should return an error if a user supplies a wrong email', (done) => {
    const account1 = {
      email: 'funmiT@gmail.com',
      password: 'Funmi111',
    };
    request(app)
      .post('/api/v1/auth/signin')
      .send(account1)
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res).to.have.status('401');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Wrong email!');
        done();
      });
  });
  it('should return an error if a user supplies a wrong password', (done) => {
    const account1 = {
      email: 'funmijoseph@hotmail.com',
      password: '$2b$08$apEmEFk4ztdEr/CJ/IO6sesuYa.FzTxAfPE/HW7w',
    };
    request(app)
      .post('/api/v1/auth/signin')
      .send(account1)
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res).to.have.status('401');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Wrong password!');
        done();
      });
  });
});
