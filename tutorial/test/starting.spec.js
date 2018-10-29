const assert = require('assert');

describe('Basic Mocha test', () => {
  it('should throw errors', () => {
    try {
      assert.equal(2, 2);
    } catch (error) {
      console.error(error);
    }
  });
});
