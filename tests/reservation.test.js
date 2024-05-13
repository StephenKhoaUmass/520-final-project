const { expect } = require('chai');
const sinon = require('sinon');

const Reservation = require('../models/Reservation');
const reservationController = require('./reservation');
const { slots } = require('../data.js'); 

describe('Reservation Controller', () => {
  describe('checkAvailableSlots', () => {
    let req, res, next;
    beforeEach(() => {
      req = { params: {} };
      res = { status: sinon.spy(), json: sinon.spy() };
      next = sinon.spy();
    });

    it('should return available slots for a date', async () => {
      const reservations = [{ slot: 'A1' }, { slot: 'B2' }];
      sinon.stub(Reservation, 'find').resolves(reservations);

      req.params.date = '2024-05-10'; 
      await reservationController.checkAvailableSlots(req, res, next);

      const expectedAvailableSlots = slots.filter(slot => !reservations.map(r => r.slot).includes(slot));
      expect(res.status).calledWith(200);
      expect(res.json).calledWith(expectedAvailableSlots);
      expect(next).not.called;
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      sinon.stub(Reservation, 'find').rejects(error);

      req.params.date = '2024-05-10';
      await reservationController.checkAvailableSlots(req, res, next);

      expect(res.status).not.calledWith(200);
      expect(res.json).not.called;
      expect(next).calledWith(error);
    });
  });
  describe('createReservation', () => {
    let req, res, next;
    beforeEach(() => {
      req = { body: {} };
      res = { status: sinon.spy(), json: sinon.spy() };
      next = sinon.spy();
    });
  
    it('should create a new reservation', async () => {
      sinon.stub(Reservation.prototype, 'save').resolves({});
  
      req.body = { date: '2024-05-11', slot: 'C3', author: 'userId' }; 
      await reservationController.createReservation(req, res, next);
  
      expect(res.status).calledWith(200);
      expect(res.json).calledOnceWith(anObjectContaining({
        date: req.body.date,
        slot: req.body.slot,
        author: req.body.author,
      }));
      expect(next).not.called;
    });
  
    it('should handle errors', async () => {
      const error = new Error('Validation error');
      sinon.stub(Reservation.prototype, 'save').rejects(error);
  
      req.body = { date: '2024-05-11', slot: 'C3', author: 'userId' };
      await reservationController.createReservation(req, res, next);
  
      expect(res.status).not.calledWith(200);
      expect(res.json).not.called;
      expect(next).calledWith(error);
    });
  });
  describe('deleteReservation', () => {
    let req, res, next;
    beforeEach(() => {
      req = { params: {} };
      res = { status: sinon.spy(), json: sinon.spy() };
      next = sinon.spy();
    }); 
  });  
  describe('getReservationsByUserId', () => {
    let req, res, next;
    beforeEach(() => {
      req = { params: {} };
      res = { status: sinon.spy(), json: sinon.spy() };
      next = sinon.spy();
    });
  
    it('should get reservations for a user', async () => {
      const userId = '123'; 
      const reservations = [{ author: userId }, { author: 'differentUser' }];
      sinon.stub(Reservation, 'find').resolves(reservations);
  
      req.params.id = userId;
      await reservationController.getReservationsByUserId(req, res, next);
  
      expect(res.status).calledWith(200);
      expect(res.json).calledWith(reservations.filter(r => r.author === userId));
      expect(next).not.called;
    });
  
    it('should handle errors', async () => {
      const error = new Error('Database error');
      sinon.stub(Reservation, 'find').rejects(error);
  
      req.params.id = '123';
      await reservationController.getReservationsByUserId(req, res, next);
  
      expect(res.status).not.calledWith(200);
      expect(res.json).not.called;
      expect(next).calledWith(error);
    });
  });  
});
