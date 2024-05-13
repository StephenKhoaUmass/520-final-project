const { expect } = require('chai');
const sinon = require('sinon'); // For mocking

const Admin = require('../models/Admin');
const adminController = require('./admin');

describe('Admin Controller', () => {
  describe('register', () => {
    let req, res, next;
    beforeEach(() => {
      req = { body: {} };
      res = { status: sinon.spy(), json: sinon.spy() };
      next = sinon.spy();
    });

    it('should create a new admin', async () => {
      sinon.stub(Admin.prototype, 'save').resolves();

      req.body = { username: 'test', password: 'test123' };
      await adminController.register(req, res, next);

      expect(res.status).calledWith(201);
      expect(res.json).calledWith('Admin has been created');
      expect(next).not.called;
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      sinon.stub(Admin.prototype, 'save').rejects(error);

      req.body = { username: 'test', password: 'test123' };
      await adminController.register(req, res, next);

      expect(res.status).not.calledWith(201);
      expect(res.json).not.called;
      expect(next).calledWith(error);
    });

    it('should hash the password before saving', async () => {
      const hash = 'hashedPassword';
      sinon.stub(bcrypt, 'hashSync').returns(hash);

      req.body = { username: 'test', password: 'test123' };
      await adminController.register(req, res, next);

      expect(Admin.prototype.save).calledOnceWith({
        username: 'test',
        password: hash,
      });
    });
  });
  describe('login', () => {
    let req, res, next;
    beforeEach(() => {
      req = { body: {} };
      res = { status: sinon.spy(), json: sinon.spy() };
      next = sinon.spy();
    });
  
    it('should login with valid credentials', async () => {
      const admin = { username: 'test', password: 'hashedPassword' };
      sinon.stub(Admin, 'findOne').resolves(admin);
      sinon.stub(bcrypt, 'compare').resolves(true);
  
      req.body = { username: 'test', password: 'test123' };
      await adminController.login(req, res, next);
  
      expect(res.status).calledWith(200);
      expect(res.json).calledWith(anObjectContaining({ ...otherDetails }));
      expect(next).not.called;
    });
  });
});
