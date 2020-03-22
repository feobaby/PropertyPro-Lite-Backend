import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../app';
import {
  postProperty, updateProperty, markPropertySold, getAProperty, getPropertyTypes,
  getAllProperty,
} from '../controllers/index';

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const login = {
  email: 'funmi10@gmail.com',
  password: 'funmi12666666',
};
const login1 = {
  email: 'funmi13@gmail.com',
  password: 'funmi.5H',
};

let request;
describe('Test for the Property Endpoints', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(() => request.close());

  describe('GET /', () => {
    it('should get the welcome page', (done) => {
      chai.request(app)
        .get('/api/v1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res).to.have.status('200');
          expect(res.body).to.include.key('message');
          expect(res.body.message).to.be.equal('Welcome to PropertyPro-Lite [back-end]');
          done();
        });
    });
  });

  describe(' EXAMPLE, GET / POST / PATCH /DELETE', () => {
    it('should handle invalid routes', (done) => {
      chai.request(app)
        .get('/api/v1/propertiessssss')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res).to.have.status('404');
          expect(res.body).to.include.key('status');
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.be.equal('This route does not exist.');
          done();
        });
    });
  });

  describe('POST /api/v1/property', () => {
    it('should post a new property', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .post('/api/v1/property')
            .set('Authorization', token)
            .send({
              price: '30,000',
              duration: '3 months',
              state: 'oyo',
              city: 'ibadan',
              address: 'bodija',
              ownerEmail: 'funmi13@gmail.com',
              imageUrl: 'https://www.google.com/search?q=images&s',
              type: 'duplex',
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(201);
              expect(res).to.have.status('201');
              expect(res.body).to.include.key('status');
              expect(res.body).to.include.key('data');
              done();
            });
        });
    });
    it('should return an error if there is a missing field', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .post('/api/v1/property')
            .set('Authorization', token)
            .send({
              price: '30,000',
              duration: '3 months',
              state: 'oyo',
              city: 'ibadan',
              address: '',
              ownerEmail: 'funmi@gmail.com',
              imageUrl: 'https://www.google.com/search?q=images&s',
              type: 'duplex',
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
    });
    it('should return a server error', async () => {
      const req = {
        body: {
          email: 'funmi13@gmail.com',
          password: 'funmi.5H',
        },
      };
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();

      await postProperty(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  describe('PATCH /api/v1/property/:id', () => {
    it('should update property details', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .patch('/api/v1/property/1')
            .set('Authorization', token)
            .send({
              price: '30,000',
              duration: '3 months',
              state: 'oyo',
              city: 'ibadan',
              address: 'akobo',
              ownerEmail: 'funmi@gmail.com',
              imageUrl: 'https://www.google.com/search?q=images&s',
              type: 'duplex',
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.include.key('status');
              expect(res.body).to.include.key('data');
              done();
            });
        });
      it('should return an error if property not found', () => {
        chai.request(app)
          .post('/api/v1/auth/signin')
          .set('Accept', 'application/json')
          .send(login)
          .end((logError, logResponse) => {
            const token = `Bearer ${logResponse.body.token}`;
            chai.request(app)
              .patch('/api/v1/property/20000')
              .set('Authorization', token)
              .send({
                status: 'Sold',
                price: '10,000 naira',
                state: 'Lagos',
                city: 'Lagos',
                address: 'No.5, Greate road, Lekki.',
                type: 'Sky-scraper',
                imageUrl: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
                ownerEmail: 'adeogodavies@yahoo.com',
              })
              .end((err, res) => {
                expect(res.status).to.be.equal(404);
                expect(res).to.have.status('404');
                expect(res.body).to.include.key('status');
                expect(res.body).to.include.key('error');
                done();
              });
          });
      });
      it('should return a server error', async () => {
        const req = {
          body: {
            email: 'funmi13@gmail.com',
            password: 'funmi.5H',
          },
        };
        const res = {
          status: () => {},
          json: () => {},
        };
        sinon.stub(res, 'status').returnsThis();

        await updateProperty(req, res);
        expect(res.status).to.have.been.calledWith(500);
      });
    });
  });

  describe('PATCH /api/v1/property/:id/sold', () => {
    it('should mark a property as sold', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .patch('/api/v1/property/1/sold')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res).to.have.status('200');
              expect(res.body).to.include.key('status');
              expect(res.body).to.include.key('data');
              done();
            });
        });
    });
    it('should return access denied if the login is unauthorised', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login1)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .patch('/api/v1/property/1/sold')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(422);
              expect(res).to.have.status('422');
              expect(res.body).to.include.key('status');
              expect(res.body).to.include.key('error');
              done();
            });
        });
    });
    it('should return a server error', async () => {
      const req = {
        body: {
          email: 'funmi13@gmail.com',
          password: 'funmi.5H',
        },
      };
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();

      await markPropertySold(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  describe('GET /api/v1/properties', () => {
    it('should get all posted property adverts', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .get('/api/v1/properties')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res).to.have.status('200');
              expect(res.body).to.include.key('status');
              expect(res.body).to.include.key('data');
              done();
            });
        });
    });
    it('should return a server error', async () => {
      const req = {
        body: {
          email: 'funmi13@gmail.com',
          password: 'funmi.5H',
        },
      };
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();

      await getAllProperty(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  describe('GET /api/v1/property/:id', () => {
    it('should get a posted property advert', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .get('/api/v1/property/1')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res).to.have.status('200');
              expect(res.body).to.include.key('status');
              expect(res.body).to.include.key('data');
              done();
            });
        });
    });
    it('should return access denied if the login is unauthorised', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login1)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .get('/api/v1/property/1')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(422);
              expect(res).to.have.status('422');
              expect(res.body).to.include.key('status');
              expect(res.body).to.include.key('error');
              done();
            });
        });
    });
    it('should return a server error', async () => {
      const req = {
        body: {
          email: 'funmi13@gmail.com',
          password: 'funmi.5H',
        },
      };
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();

      await getAProperty(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  describe('GET /api/v1/property/type/:id', () => {
    it('should get all requested property types', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .get('/api/v1/property/type/1?type=duplex&state=Oyo&&city=Ibadan&&price=30,000&&duration=1 year')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res).to.have.status('200');
              expect(res.body).to.include.key('status');
              expect(res.body).to.include.key('data');
              done();
            });
        });
    });
    it('should return a server error', async () => {
      const req = {
        body: {
          email: 'funmi13@gmail.com',
          password: 'funmi.5H',
        },
      };
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();

      await getPropertyTypes(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
});
