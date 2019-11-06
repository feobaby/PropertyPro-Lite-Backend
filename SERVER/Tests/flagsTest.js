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

  describe('POST /api/v1/property/flag/:id', () => {
    it('should flag a fraudulent property', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .post('/api/v1/property/flag/2')
            .set('Authorization', token)
            .send({
              reason: 'Fake',
              description: 'Fake',
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
    it('should return an error if a user does not supply the required fields', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .post('/api/v1/property/flag/2')
            .set('Authorization', token)
            .send({
              reason: '',
              description: 'Fake',
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
});
