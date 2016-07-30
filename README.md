# dataset
Utility to have Sets in Javascript that allows deep object comparison and custom comparators

```js
npm install -S dataset.js
```

## Usage
```js
var DataSet = require('dataset.js');
var ds = new DataSet();
```

### Examples
```js
// assume this object for all examples below
var doc = {
  id: 123,
  name: 'jimmy',
  location: 'San Francisco, CA'
};

// iterates through all items in the set,
// does a deep compare, and adds if the doc
// is not already in the set.
ds.addToSet(doc);

// pulls the item from the set
ds.pull(doc);

// for each item in docs,
// call addToSet
ds.addEachToSet(docs);

// returns true if the exact (deeply compared) document is in the set.
ds.hasItem(doc);

// clear all items from the set.
ds.clear();
```

### String Comparator
```js
// iterates through the set and checks for any 
// existing documents with the same id. (does NOT deep compare)
ds.addToSet(doc, 'id');
ds.pull(doc, 'id');
ds.addEachToSet(docs, 'id');
ds.hasItem(doc, 'id');
```

### Custom Function Comparator
```js
var comparatorFunction = function(lhs, rhs) {
  return lhs.fancyKey === rhs.fancyKey;
};

// iterates through the set and passes each item
// through the comparator function
ds.addToSet(doc, comparatorFunction);
ds.addToSet(doc, comparatorFunction);
ds.pull(doc, comparatorFunction);
ds.addEachToSet(docs, comparatorFunction);
ds.hasItem(doc, comparatorFunction);
```
