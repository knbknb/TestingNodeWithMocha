const assert = require('assert');
const { expect } = require('chai');
const should = require('chai').should();
const chai = require('chai');

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
  describe('isAuthorized', () => {
    it('Should return false if not authorized', () => {
      const isAuth = authController.isAuthorized('admin');
      // assert.equal(false, isAuth);
      expect(isAuth).to.be.false;
    });
    it('Should return true if authorized', () => {
      authController.setRoles(['user', 'admin']);
      const isAuth = authController.isAuthorized('admin');
      isAuth.should.be.true;
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
});
