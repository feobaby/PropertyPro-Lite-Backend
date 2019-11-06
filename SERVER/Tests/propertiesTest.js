import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

const login = {
  email: 'funmi13@gmail.com',
  password: 'funmi.5H',
};
let request;
describe('Test for the flag-property Endpoint', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(() => request.close());

  describe('GET /', () => {
    it('should get the welcome page', (done) => {
      chai.request(app)
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

  describe(' EXAMPLE, GET / POST / PATCH /DELETE', () => {
    it('should handle invalid routes', (done) => {
      chai.request(app)
        .get('/api/v1/properties')
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

  describe('POST /api/v1/post-property', () => {
    it('should post a new property', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .post('/api/v1/post-property')
            .set('Authorization', token)
            .send({
              price: '30,000',
              duration: '3 months',
              state: 'oyo',
              city: 'ibadan',
              address: 'bodija',
              owner_email: 'funmi13@gmail.com',
              image_url: 'https://www.google.com/search?q=images&s',
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
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .post('/api/v1/post-property')
            .set('Authorization', token)
            .send({
              price: '30,000',
              duration: '3 months',
              state: 'oyo',
              city: 'ibadan',
              address: '',
              owner_email: 'funmi@gmail.com',
              image_url: 'https://www.google.com/search?q=images&s',
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
  });

  describe('PATCH /api/v1/update-property/:id', () => {
    it('should update property details', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .patch('/api/v1/update-property/2')
            .set('Authorization', token)
            .send({
              price: '30,000',
              duration: '3 months',
              state: 'oyo',
              city: 'ibadan',
              address: 'akobo',
              owner_email: 'funmi@gmail.com',
              image_url: 'https://www.google.com/search?q=images&s',
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
            const token = `Bearer ${logResponse.body.data.token}`;
            chai.request(app)
              .patch('/api/v1/update-property/20000')
              .set('Authorization', token)
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
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .patch('/api/v1/mark-property/2/sold')
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
  });

  describe('GET /api/v1/all-properties', () => {
    it('should get all posted property adverts', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .get('/api/v1/all-properties')
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
  });

  describe('GET /api/v1/one-property/:id', () => {
    it('should get a posted property advert', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .get('/api/v1/one-property/2')
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
  });

  describe('GET /api/v1/property/type/:id', () => {
    it('should get all requested property types', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .get('/api/v1/property/type/1?type=duplex&&state=oyo&&city=london&&price=30,000&&duration=3 months')
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
  });
});
