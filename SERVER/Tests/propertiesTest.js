import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

const token = process.env.JWT_TOKEN;

describe('GET /', () => {
  it('should get the welcome page', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Welcome to PropertyPro-Lite');
        done();
      });
  });
});

describe('POST /api/v1/property', () => {
  it('should post a new property', (done) => {
    const property = {
      property_id: '300',
      status: 'Available',
      price: '10,000,000 naira',
      state: 'Lagos',
      city: 'Lagos',
      address: 'No.5, Greate road, Lekki.',
      type: 'Sky-scraper',
      image_url: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
      owner_email: 'adeogodavies@yahoo.com',
    };
    request(app)
      .post('/api/v1/property')
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
  it('should return an error if all the required fields are not supplied', (done) => {
    const property = {
      status: 'Available',
      price: '10,000,000 naira',
      state: 'Lagos',
      city: 'Lagos',
      address: '',
      type: 'Sky-scraper',
      image_url: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
    };
    request(app)
      .post('/api/v1/property')
      .set('Accept', 'application/json')
      .set('token', token)
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
        owner_email: 'adeogodavies@yahoo.com',
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
      .patch('/api/v1/property/1')
      .set('Accept', 'application/json')
      .set('token', token)
      .send({
        price: '10,000 naira',
        state: 'Ogun',
        city: 'Abeokuta',
        address: 'No.5, Greate road, Aro.',
        type: 'Sky-scraper',
        image_url: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
        owner_email: 'adeogodavies@yahoo.com',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        done();
      });
  });
  it('should return an error if property not found', (done) => {
    request(app)
      .patch('/api/v1/property/1100')
      .set('Accept', 'application/json')
      .set('token', token)
      .send({
        status: 'Sold',
        price: '10,000 naira',
        state: 'Lagos',
        city: 'Lagos',
        address: 'No.5, Greate road, Lekki.',
        type: 'Sky-scraper',
        image_url: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
        owner_email: 'adeogodavies@yahoo.com',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res).to.have.status('404');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        done();
      });
  });
  it('should return an error if required fields are not supplied', (done) => {
    request(app)
      .patch('/api/v1/property/1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        status: 'Sold',
        price: '10,000 naira',
        state: '',
        city: '',
        address: 'No.5, Greate road, Lekki.',
        type: 'Sky-scraper',
        image_url: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
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
        owner_email: 'adeogodavies@yahoo.com',
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

describe('PATCH /api/v1/property/:property_id/sold', () => {
  it('should mark a property as sold', (done) => {
    request(app)
      .patch('/api/v1/property/4/sold')
      .set('Accept', 'application/json')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        done();
      });
  });
  it('should return an error if the token is not supplied or invalid', (done) => {
    request(app)
      .patch('/api/v1/property/4/sold')
      .set('Accept', 'application/json')
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

describe('DELETE /api/v1/property/:property_id', () => {
  it('should return an error is property not found', (done) => {
    request(app)
      .delete('/api/v1/property/15')
      .set('Accept', 'application/json')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res).to.have.status('404');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Property not found!');
        done();
      });
  });
  it('should return an error if the token is not supplied or invalid', (done) => {
    request(app)
      .delete('/api/v1/property/15')
      .set('Accept', 'application/json')
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

describe('GET /api/v1/property', () => {
  it('should get all posted property adverts', (done) => {
    request(app)
      .get('/api/v1/property')
      .set('Accept', 'application/json')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        done();
      });
  });
  it('should return an error if the token is not supplied or invalid', (done) => {
    request(app)
      .get('/api/v1/property')
      .set('Accept', 'application/json')
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

describe('GET /api/v1/property/:property_id', () => {
  it('should get all posted property adverts', (done) => {
    request(app)
      .get('/api/v1/property/1')
      .set('Accept', 'application/json')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        done();
      });
  });
  // it('should return an error if the property is not found', (done) => {
  //   request(app)
  //     .get('/api/v1/property/1001')
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)
  //     .end((err, res) => {
  //       expect(res.status).to.be.equal(404);
  //       expect(res).to.have.status('404');
  //       expect(res.body).to.be.an('object');
  //       expect(res.body).to.include.key('status');
  //       expect(res.body).to.include.key('error');
  //       expect(res.body.error).to.be.equal('Property not found!');
  //       done();
  //     });
  // });
  it('should return an error if the token is not supplied or invalid', (done) => {
    request(app)
      .get('/api/v1/property/1')
      .set('Accept', 'application/json')
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

describe('GET /api/v1/property/type/:property_id', () => {
  it('should get all requested property types', (done) => {
    request(app)
      .get('/api/v1/property/type/1?type=duplex')
      .set('Accept', 'application/json')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        done();
      });
  });
});
