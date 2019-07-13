import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

const token = process.env.JWT_TOKEN;
describe('POST /api/v1/property', () => {
  it('should post a new property', (done) => {
    request(app)
      .post('/api/v1/property')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        status: 'Available',
        price: '10,000,000 naira',
        state: 'Lagos',
        city: 'Lagos',
        address: 'No.5, Greate road, Lekki.',
        type: 'Sky-scraper',
        image_url: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res).to.have.status('201');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        done();
      });
  });
  it('should return an error if all the required fields are not supplied', (done) => {
    request(app)
      .post('/api/v1/property')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        status: 'Available',
        price: '10,000,000 naira',
        state: '',
        city: 'Lagos',
        address: 'No.5, Greate road, Lekki.',
        type: '',
        image_url: '',
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
  it('should return an error if the token is not supplied or invalid', (done) => {
    request(app)
      .post('/api/v1/property')
      .set('Accept', 'application/json')
      .send({
        status: 'Available',
        price: '10,000,000 naira',
        state: 'Lagos',
        city: 'Lagos',
        address: 'No.5, Greate road, Lekki.',
        type: 'Sky-scraper',
        image_url: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Token is invalid or not provided!');
        done();
      });
  });
});

describe('PATCH /api/v1/property/:property_id', () => {
  it('should update property details', (done) => {
    request(app)
      .patch('/api/v1/property/18')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        status: 'Sold',
        price: '10,000 naira',
        state: 'Lagos',
        city: 'Lagos',
        address: 'No.5, Greate road, Lekki.',
        type: 'Sky-scraper',
        image_url: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        expect(res.body).to.include.key('token');
        done();
      });
  });
  it('should return an error if property not found', (done) => {
    request(app)
      .patch('/api/v1/property/11')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        status: 'Sold',
        price: '10,000 naira',
        state: 'Lagos',
        city: 'Lagos',
        address: 'No.5, Greate road, Lekki.',
        type: 'Sky-scraper',
        image_url: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res).to.have.status('404');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        done();
      });
  });
  it('should return an error if the token is not supplied or invalid', (done) => {
    request(app)
      .patch('/api/v1/property/18')
      .set('Accept', 'application/json')
      .send({
        status: 'Sold',
        price: '10,000 naira',
        state: 'Lagos',
        city: 'Lagos',
        address: 'No.5, Greate road, Lekki.',
        type: 'Sky-scraper',
        image_url: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Token is invalid or not provided!');
        done();
      });
  });
});
