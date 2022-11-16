const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const controllerMock = require('./Mocks/sales.controller.mock');

describe('Test controller layer of sales path', function () {
  afterEach(sinon.restore);

  it('should return status 500 and message with "Internal server error!"', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'findAllSales')
      .resolves({ type: 'INTERNAL_SERVER_ERROR', message: 'Internal server error!' });

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Internal server error!' });
  });

  it('should return status 200 and message with an array of sales', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'findAllSales')
      .resolves({ type: null, message: controllerMock.allSales });

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(controllerMock.allSales);
  });


  it('should return status 404 and message with "Sale not found"', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'findSaleById')
      .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('should return status 200 and message with sale object', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'findSaleById')
      .resolves({ type: null, message: controllerMock.allSales[0] });

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(controllerMock.allSales[0]);
  });

});

