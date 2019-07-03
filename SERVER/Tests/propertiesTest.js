import moment from 'moment';
import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);
const token = process.env.JWT_TOKEN;

const invalidtoken = 'eyJhbGciOiJIUzI1iIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsidXNlciI6eyJpZCI6MSwiZW1haWwiOiJmdW5taWpvc2VwaEBob3RtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkZ1bm1pIiwibGFzdE5hbWUiOiJPbGFpeWEiLCJwYXNzd29yZCI6IiQyYiQwOCRhcEVtRUZrNHp0ZEVyL0NKL0lPNnNlc3VZYS5GelR4QWZQRS9IVzd3WURXd3UzSWIvQ1dOYSIsInBob25lTnVtYmVyIjoiMDgwNjU2ODc4ODciLCJpc0FkbWluIjoiTk8ifX0sImlhdCI6MTU2MjAwODExMywiZXhwIjoxNTYyNjEyOTEzfQ.jY2DncBB7jS1bo9jMzOZeoXWEmI5eZC1hh12QkTVDY4';

// eslint-disable-next-line no-undef
describe('POST /api/v1/auth/postproperty ', () => {
  it('should create a new property', (done) => {
    const propertydetails = {
      owner: 'Funmi Olaiya',
      status: 'Available',
      price: 'N1,000,000',
      purpose: 'Buy',
      duration: 'Yearly',
      type: 'Mini-Flat',
      bedroom: '2',
      bathroom: '2',
      state: 'Ogun',
      city: 'Abeokuta',
      address: 'No.4, Iron man street.',
      createdOn: 'Nove',
      imageUrl: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
    };
    request(app)
      .post('/api/v1/auth/postproperty')
      .set('Authorization', token)
      .send(propertydetails)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res).to.have.status('201');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        done();
      });
  });

  it('should return an error if a user does not supply all or some information', (done) => {
    const propertydetails = {
      owner: '',
      status: '',
      price: '',
      purpose: 'Buy',
      duration: 'Yearly',
      type: 'Mini-Flat',
      bedroom: '2',
      bathroom: '2',
      state: 'Ogun',
      city: '',
      address: 'No.4, Iron man street.',
      createdOn: moment(new Date()),
      imageUrl: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
    };
    request(app)
      .post('/api/v1/auth/postproperty')
      .set('Authorization', token)
      .send(propertydetails)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply all the information required!');
        done();
      });
  });
  it('should return an error if token is not provided', (done) => {
    const propertydetails = {
      owner: 'Funmi Olaiya',
      status: 'Available',
      price: 'N1,000,000',
      purpose: 'Buy',
      duration: 'Yearly',
      type: 'Mini-Flat',
      bedroom: '2',
      bathroom: '2',
      state: 'Ogun',
      city: 'Abeokuta',
      address: 'No.4, Iron man street.',
      createdOn: moment(new Date()),
      imageUrl: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
    };
    request(app)
      .post('/api/v1/auth/postproperty')
      .send(propertydetails)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Token is not provided');
        done();
      });
  });

  it('should return an error if token is invalid', (done) => {
    const propertydetails = {
      owner: 'Funmi Olaiya',
      status: 'Available',
      price: 'N1,000,000',
      purpose: 'Buy',
      duration: 'Yearly',
      type: 'Mini-Flat',
      bedroom: '2',
      bathroom: '2',
      state: 'Ogun',
      city: 'Abeokuta',
      address: 'No.4, Iron man street.',
      createdOn: moment(new Date()),
      imageUrl: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
    };
    request(app)
      .post('/api/v1/auth/postproperty')
      .set('Authorization', invalidtoken)
      .send(propertydetails)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('name');
        expect(res.body).to.include.key('message');
        expect(res.body.name).to.be.equal('JsonWebTokenError');
        expect(res.body.message).to.be.equal('invalid token');
        done();
      });
  });
});
