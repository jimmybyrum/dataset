'use strict';

var assert = require('chai').assert;
var DataSet = require('../index');

var testData = [{
  name: 'jimmy'
}, {
  name: 'erin'
}];

describe('DataSet', function() {
  var ds = new DataSet();

  describe('addToSet', function() {
    it('should return true when adding new object to set', function() {
      var result = ds.addToSet(testData[0]);
      assert.equal(result, true);
    });
    it('should return length of 1', function() {
      assert.equal(ds.length, 1);
    });
    it('should return false when adding the same object to set', function() {
      var result = ds.addToSet(testData[0]);
      assert.equal(result, false);
    });
    it('should still return length of 1', function() {
      assert.equal(ds.length, 1);
    });
  });

  describe('pull', function() {
    it('should return length of 0 after pulling object from set', function() {
      ds.pull(testData[0]);
      assert.equal(ds.length, 0);
    });
  });

  describe('addEachToSet', function() {
    it('should return length of 2 after adding an array of objects to set', function() {
      ds.addEachToSet(testData);
      assert.equal(ds.length, 2);
    });
    it('should return length of 1 after pulling 1 object from set', function() {
      ds.pull(testData[0]);
      assert.equal(ds.length, 1);
    });
  });

  describe('hasItem', function() {
    it('should return true when checking for exising item', function() {
      assert.equal(ds.hasItem(testData[1]), true);
    });
    it('should return false when checking for non-existent item', function() {
      assert.equal(ds.hasItem(testData[0]), false);
    });
  });

  describe('clear', function() {
    it('should return a length of 0 after calling clear', function() {
      ds.clear();
      assert.equal(ds.length, 0);
    });
  });
});
