const assert = require('assert');
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
      assert.equal(false, authController.isAuthorized('admin'));
    });
    it('Should return true if authorized', () => {
      authController.setRoles(['user', 'admin']);
      assert.equal(true, authController.isAuthorized('admin'));
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
});
