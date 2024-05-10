const { expect } = require('chai');
const sinon = require('sinon');

const User = require('../models/User');
const userController = require('./user');

describe('User Controller', () => {
  describe('register', () => {
    let req, res, next;
    beforeEach(() => {
      req = { body: {} };
      res = { status: sinon.spy(), json: sinon.spy() };
      next = sinon.spy();
    });

    it('should create a new user', async () => {
      sinon.stub(User.prototype, 'save').resolves({});

      req.body = { username: 'test', password: 'test123' };
      await userController.register(req, res, next);

      expect(res.status).calledWith(201);
      expect(res.json).calledWith('User has been created');
      expect(next).not.called;
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      sinon.stub(User.prototype, 'save').rejects(error);

      req.body = { username: 'test', password: 'test123' };
      await userController.register(req, res, next);

      expect(res.status).not.calledWith(201);
      expect(res.json).not.called;
      expect(next).calledWith(error);
    });

    it('should hash the password before saving', async () => {
      const hash = 'hashedPassword';
      sinon.stub(bcrypt, 'hashSync').returns(hash);

      req.body = { username: 'test', password: 'test123' };
      await userController.register(req, res, next);

      expect(User.prototype.save).calledOnceWith({
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
      const user = { username: 'test', password: 'hashedPassword' };
      sinon.stub(User, 'findOne').resolves(user);
      sinon.stub(bcrypt, 'compare').resolves(true);
  
      req.body = { username: 'test', password: 'test123' };
      await userController.login(req, res, next);
  
      expect(res.status).calledWith(200);
      expect(res.json).calledWith(anObjectContaining({ ...otherDetails }));
      expect(next).not.called;
    });
  });  
});
