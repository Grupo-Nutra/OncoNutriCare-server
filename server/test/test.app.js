const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require("../src/app");

describe('Title', () => {
  describe('subtitle', () => {
    it('should pass', async () => {
      const five = 5;
      expect(five).to.equal(5);
    });
  });
});