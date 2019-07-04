import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);
const token = process.env.JWT_TOKEN;

const invalidtoken = 'yJhbGciOiJIUzI1iIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsidXNlciI6eyJpZCI6MSwiZW1haWwiOiJmdW5taWpvc2VwaEBob3RtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkZ1bm1pIiwibGFzdE5hbWUiOiJPbGFpeWEiLCJwYXNzd29yZCI6IiQyYiQwOCRhcEVtRUZrNHp0ZEVyL0NKL0lPNnNlc3VZYS5GelR4QWZQRS9IVzd3WURXd3UzSWIvQ1dOYSIsInBob25lTnVtYmVyIjoiMDgwNjU2ODc4ODciLCJpc0FkbWluIjoiTk8ifX0sImlhdCI6MTU2MjAwODExMywiZXhwIjoxNTYyNjEyOTEzfQ.jY2DncBB7jS1bo9jMzOZeoXWEmI5eZC1hh12QkTVDY4';

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
      createdOn: '2019-07-03T19:23:42.215Z',
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

describe('PATCH /api/v1/auth/updateproperty/:id ', () => {
  it('should update a property', (done) => {
    const updatepropertydetails = {
      price: 'N2,000,000',
      status: 'Sold',
      duration: 'Nil',
      imageUrl: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
    };
    request(app)
      .patch('/api/v1/auth/updateproperty/1')
      .set('Authorization', token)
      .send(updatepropertydetails)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('data');
        expect(res.body).to.include.key('status');
        expect(res.body.data[0]).to.include.key('token');
        expect(res.body.data[0]).to.include.key('updateProperty');
        done();
      });
  });

  it('should return an error if token is not provided', (done) => {
    const updatepropertydetails = {
      price: 'N2,000,000',
      status: 'Sold',
      duration: 'Nil',
      image_url: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
    };
    request(app)
      .patch('/api/v1/auth/updateproperty/1')
      .send(updatepropertydetails)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Token is not provided');
        done();
      });
  });
  it('should return an error if a user does not supply all fields', (done) => {
    const updatepropertydetails = {
      price: '',
      status: '',
      duration: '',
      image_url: '',
    };
    request(app)
      .patch('/api/v1/auth/updateproperty/2')
      .set('Authorization', token)
      .send(updatepropertydetails)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply all required fields');
        done();
      });
  });
  it('should return an error if property is not found', (done) => {
    const updatepropertydetails = {
      price: 'N2,000,000',
      status: 'Sold',
      duration: 'Nil',
      image_url: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
    };
    request(app)
      .patch('/api/v1/auth/updateproperty/9')
      .set('Authorization', token)
      .send(updatepropertydetails)
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res).to.have.status('404');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, this property can not be found');
        done();
      });
  });
});

describe('PATCH /api/v1/auth/markproperty/:id ', () => {
  it('should mark a property as sold', (done) => {
    const markproperty = {
      status: 'Sold',
    };
    request(app)
      .patch('/api/v1/auth/markproperty/2')
      .set('Authorization', token)
      .send(markproperty)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('data');
        expect(res.body).to.include.key('status');
        expect(res.body.data[0]).to.include.key('token');
        expect(res.body.data[0]).to.include.key('markProperty');
        done();
      });
  });

  it('should return an error if token is not provided', (done) => {
    const markproperty = {
      status: 'Sold',
    };
    request(app)
      .patch('/api/v1/auth/markproperty/2')
      .send(markproperty)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Token is not provided');
        done();
      });
  });
  it('should return an error if a user does not supply the status field', (done) => {
    const markproperty = {
      status: '',
    };
    request(app)
      .patch('/api/v1/auth/markproperty/2')
      .set('Authorization', token)
      .send(markproperty)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply the status');
        done();
      });
  });
  it('should return an error if property is not found', (done) => {
    const markproperty = {
      status: '',
    };
    request(app)
      .patch('/api/v1/auth/markproperty/9')
      .set('Authorization', token)
      .send(markproperty)
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res).to.have.status('404');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, this property can not be found');
        done();
      });
  });
});

describe('DELETE /api/v1/auth/deleteproperty/:id ', () => {
  it('should delete a property', (done) => {
    request(app)
      .delete('/api/v1/auth/deleteproperty/3')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('data');
        expect(res.body).to.include.key('status');
        expect(res.body.data[0]).to.include.key('message');
        expect(res.body.data[0].message).to.be.equal('Your property advert is deleted successfully');
        done();
      });
  });

  it('should return an error if token is not provided', (done) => {
    request(app)
      .delete('/api/v1/auth/deleteproperty/2')
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Token is not provided');
        done();
      });
  });

  it('should return an error if the record is not found', (done) => {
    request(app)
      .delete('/api/v1/auth/deleteproperty/12')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res).to.have.status('404');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, this property can not be found');
        done();
      });
  });
});

describe('GET /api/v1/auth/allproperties', () => {
  it('should get all properties', (done) => {
    request(app)
      .get('/api/v1/auth/allproperties')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('data');
        expect(res.body).to.include.key('status');
        done();
      });
  });

  it('should return an error if token is not provided', (done) => {
    request(app)
      .get('/api/v1/auth/allproperties')
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Token is not provided');
        done();
      });
  });
});

describe('GET /api/v1/auth/property/1', () => {
  it('should get/view one(a specific) property', (done) => {
    request(app)
      .get('/api/v1/auth/property/1')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('data');
        expect(res.body).to.include.key('status');
        done();
      });
  });

  it('should return an error if token is not provided', (done) => {
    request(app)
      .get('/api/v1/auth/property/1')
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Token is not provided');
        done();
      });
  });
  it('should return an error if property is not found', (done) => {
    request(app)
      .get('/api/v1/auth/property/9')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res).to.have.status('404');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, this property can not be found');
        done();
      });
  });
});
