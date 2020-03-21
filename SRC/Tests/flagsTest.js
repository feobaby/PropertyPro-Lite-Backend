import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../app';
import { flagProperty } from '../controllers/index';

const { expect } = chai;
chai.use(sinonChai);
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
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .post('/api/v1/property/flag/1')
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
          const token = `Bearer ${logResponse.body.token}`;
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

      await flagProperty(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
});
