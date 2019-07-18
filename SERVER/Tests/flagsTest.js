import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

const token = process.env.JWT_TOKEN;

describe('POST /api/v1/property/flag', () => {
  it('should flag a fraudulent property', (done) => {
    const property = {
      property_id: '73',
      reason: 'Fake',
      description: 'Fake',
    };
    request(app)
      .post('/api/v1/property/flag')
      .set('Accept', 'application/json')
      .set('token', token)
      .send(property)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res).to.have.status('201');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        done();
      });
  });
  it('should return an error if a user does not supply the required fields', (done) => {
    const property = {
      property_id: '73',
      reason: 'Fake',
      description: '',
    };
    request(app)
      .post('/api/v1/property/flag')
      .set('Accept', 'application/json')
      .send(property)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply the required fields!');
        done();
      });
  });
});
