const assert = require('assert');
const { expect } = require('chai');
const should = require('chai').should();
const chai = require('chai');
const sinon = require('sinon');

const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

const authController = require('../../controllers/auth.controller');

describe('AuthController', () => {
  // hook
  beforeEach(function settingUp() {
    console.log('running before each');
    authController.setRoles(['user']);
  });

  // nested describe
  describe('isAuthorized', function () {
    let user = {};
    beforeEach(function () {
      user = {
        roles: ['user'],
        /* eslint object-shorthand: 0 */
        isAuthorized: function (neededRole) {
          return this.roles.indexOf(neededRole) >= 0;
        }
      };
      sinon.spy(user, 'isAuthorized');
      authController.setUser(user);
    });
    it('Should return false if not authorized', () => {
      const isAuth = authController.isAuthorized('admin');
      // assert.equal(false, isAuth);
      // console.log(user.isAuthorized);
      user.isAuthorized.calledOnce.should.be.true;

      expect(isAuth).to.be.false;
    });
    it('Should return true if authorized', () => {
      authController.setRoles(['user', 'admin']);
      const isAuth = authController.isAuthorized('admin');
      isAuth.should.be.false;
      // assert.equal(true, authController.isAuthorized('admin'));
    });

    // pending tests. no need for TODO comments
    it('should not allow a get if not authorized');
    it('should allow get if authorized');
  });


  describe('isAuthorizedAsync', () => {
    // beforeEach('intentionally fails', function erroringFunction() {
    //   throw ({
    //     error: 'err'
    //   });
    // });
    it('Should return false if not authorized', function x(done) {
      // 'this' refers to mocha object here. Only when NOT using arrow functions
      // this.timeout(2500);
      authController.isAuthorizedAsync('admin',
        (isAuth) => {
          assert.equal(false, isAuth);
          done();
        });
    });
  });


  describe('isAuthorizedPromise', () => {
    it('Should return false if not authorized', function x() {
      // 'this' refers to mocha object here. Only when NOT using arrow functions
      // this.timeout(2500);
      authController.isAuthorizedPromise('admin').should.eventually.be.false;
    });
  });

  describe.only('index', function () {
    let user = {};
    beforeEach(function () {
      user = {
        roles: ['user'],
        /* eslint object-shorthand: 0 */
        isAuthorized: function (neededRole) {
          return this.roles.indexOf(neededRole) >= 0;
        }
      };
    //   sinon.spy(user, 'isAuthorized');
    //   authController.setUser(user);
    });
    it('should render index if authorized', function () {
      const isAuth = sinon.stub(user, 'isAuthorized').returns(true);
      const req = { user: user };
      const res = {
        render: sinon.spy()
      };
      authController.getIndex(req, res);

      isAuth.calledOnce.should.be.true;
      res.render.calledOnce.should.be.true;
      res.render.firstCall.args[0].should.equal('index');
    });
    it.only('should NOT render index if NOT authorized', function () {
      const isAuth = sinon.stub(user, 'isAuthorized').throws();
      const req = { user: user };
      const res = {
        render: sinon.spy()
      };
      authController.getIndex(req, res);

      isAuth.called.should.be.true;
      res.render.calledOnce.should.be.true;
      assert(typeof res.render.firstCall.args[0], 'Error');
    });
  });
});
