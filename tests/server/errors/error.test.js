import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../../index';

chai.config.includeStack = true;

describe('## Basic Error APIs', () => {
  it('sending valid error is successful', (done) => {
    const error = {
      clientId: '1234567',
      deviceType: 'API',
      errorTime: new Date().getTime(),
      errorData: {
        errorType: 'Unauthorized'
      }
    };
    request(app)
      .post('/api/v1/error')
      .send(error)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).to.exist; //eslint-disable-line
        expect(res.body.result).to.equal('success'); //eslint-disable-line
        done();
      })
      .catch(done);
  });

  it('errors when no clientId is sent', (done) => {
    const error = {
      deviceType: 'Browser',
      errorTime: new Date().getTime(),
      errorData: {}
    };
    request(app)
      .post('/api/v1/error')
      .send(error)
      .expect(httpStatus.BAD_REQUEST)
      .then((res) => {
        expect(res.body).to.exist; //eslint-disable-line
        expect(res.body.message).to.equal('"clientId" is required')
        done();
      })
      .catch(done);
  });

  it('errors when no deviceType is sent', (done) => {
    const error = {
      clientId: '1234567',
      errorTime: new Date().getTime(),
      errorData: {
        userId: '3462562'
      }
    };
    request(app)
      .post('/api/v1/error')
      .send(error)
      .expect(httpStatus.BAD_REQUEST)
      .then((res) => {
        expect(res.body).to.exist; //eslint-disable-line
        expect(res.body.message).to.equal('"deviceType" is required')
        done();
      })
      .catch(done);
  });

  it('errors when no errorTime is sent', (done) => {
    const error = {
      clientId: '1234567',
      deviceType: 'API',
      errorData: {
        userId: '3462562'
      }
    };
    request(app)
      .post('/api/v1/error')
      .send(error)
      .expect(httpStatus.BAD_REQUEST)
      .then((res) => {
        expect(res.body).to.exist; //eslint-disable-line
        expect(res.body.message).to.equal('"errorTime" is required')
        done();
      })
      .catch(done);
  });

  it('errors when no errorData is sent', (done) => {
    const error = {
      clientId: '1234567',
      deviceType: 'API',
      errorTime: new Date().getTime()
    };
    request(app)
      .post('/api/v1/error')
      .send(error)
      .expect(httpStatus.BAD_REQUEST)
      .then((res) => {
        expect(res.body).to.exist; //eslint-disable-line
        expect(res.body.message).to.equal('"errorData" is required')
        done();
      })
      .catch(done);
  });
});
