'use strict';

/**
 * Extension of Array that adds functions for ensuring unique values.
 * Loosely based on mongo arrays:
 * https://docs.mongodb.com/manual/reference/operator/update-array/
 * Set is a new data type in ES6, though it does not enforce object uniqueness:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 *
 * @type       DataSet
 */

var _ = require('underscore');
var deepEqual = require('deep-equal');

module.exports = DataSet;

function DataSet() {

  // copy Array
  var dataSet = clone(Array, {
    hasItem: hasItem,
    addToSet: addToSet,
    addEachToSet: addEachToSet,
    pull: pull,
    clear: clear
  });

  /**
   * Determines if it has item.
   *
   * @param      {Mixed}   item    The item to look for
   * @param      {String}   comparator    optional comparator to use instead of deeply comparing items
   * @return     {boolean}  True if has item, False otherwise.
   */
  function hasItem(item, comparator) {
    // console.info('hasItem', item, comparator);
    if (_.isObject(item)) {
      var doesHaveItem = _.find(this, function(_item) {
        return equal(_item, item, comparator);
      });
      return doesHaveItem !== undefined;
    }
    return this.indexOf(item) > -1;
  }

  /**
   * Adds item to dataSet if not already in the set.
   *
   * @param      {<type>}   item|items    The item to add. If an array of items is passed, addEachToSet will be called.
   * @param      {<type>}   comparator     optional comparator to use instead of deeply comparing items
   * @return     {boolean}  True if item added, False otherwise.
   */
  function addToSet(item, comparator) {
    // console.info('addToSet', item, comparator);
    if (item === null || item === undefined) {
      return false;
    }
    if (_.isArray(item)) {
      return this.addEachToSet(item, comparator);
    }
    if (!this.hasItem(item, comparator)) {
      this.push(item);
      return true;
    }
    return false;
  }

  /**
   * Add array of items to the set
   *
   * @param      {<type>}   item    The item to add
   * @param      {<type>}   comparator     optional comparator to use instead of deeply comparing items
   * @return     {boolean}  Array of true|false reflecting if items were added or not
   */
  function addEachToSet(items, comparator) {
    // console.info('addEachToSet', items, comparator);
    var self = this;
    var results = [];
    _.each(items, function(item) {
      var result = self.addToSet(item, comparator);
      results.push(result);
    });
    return results;
  }

  /**
   * Pull item from set
   *
   * @param      {<type>}  item    The item to remove
   * @param      {<type>}  comparator     optional comparator to use instead of deeply comparing items
   */
  function pull(item, comparator) {
    // console.info('pull', item, comparator);
    var idx;
    if (_.isObject(item)) {
      _.each(this, function(_item, _idx) {
        if (equal(_item, item, comparator)) {
          idx = _idx;
        }
      });
    } else {
      idx = this.indexOf(item);
    }
    if (idx > -1) {
      this.splice(idx, 1);
    }
  }

  /**
   * Clear the set
   */
  function clear() {
    this.splice(0, this.length);
  }

  /**
   * fn to compare two values based on
   *  * deep equality
   *  * a key, if comparator is a string
   *  * a custom function, if comparator is a function
   *
   * @param      {Mixed}    lhs         The left hand side
   * @param      {Mixed}    rhs         The right hand side
   * @param      {Function}  comparator  Optional key or function to use for comparison
   * @return     {Boolean}    True or False
   */
  function equal(lhs, rhs, comparator) {
    if (_.isFunction(comparator)) {
      return comparator(lhs, rhs);
    } else if (_.isString(comparator)) {
      return lhs[comparator] === rhs[comparator];
    } else {
      return deepEqual(lhs, rhs);
    }
  }

  return dataSet;
}

function clone(source, extra) {
  function F() {}
  F.prototype = source.prototype;
  _.each(extra, function(value, key) {
    F.prototype[key] = value;
  });
  return new F();
}
