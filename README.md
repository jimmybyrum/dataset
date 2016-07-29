# dataset
Utility to have Sets in Javascript that allows deep object comparison and custom comparators

```js
npm install -S dataset.js
```

## Usage
```js
var DataSet = require('dataset.js');

var ds = new DataSet();

ds.addToSet({
  name: 'jimmy'
});

ds.pull({
  name: 'jimmy'
});

ds.addEachToSet([{
  name: 'jimmy'
}, {
  name: 'erin'
}]);

ds.hasItem({
  name: 'jimmy'
}); // true

ds.clear();
```
