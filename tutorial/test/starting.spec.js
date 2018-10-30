// const assert = require('assert');
// const { expect } = require('chai');
const should = require('chai').should();

describe('Basic Mocha test', () => {
  it('should deal with objects', function () {
    const knut = { name: 'Knut', gender: 'male' };
    knut.should.have.property('name');
  });

  it('should allow testing nulls', function () {
    const iAmNull = null;
    should.not.exist(iAmNull);
  });
});
