# Type
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/70d2c2373f4f47eab9258ede9428fef5)](https://www.codacy.com/app/konfirm/node-type?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=konfirm/node-type&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/konfirm/node-type.svg?branch=master)](https://travis-ci.org/konfirm/node-type)

Detect variable types and names

## Getting started

### Installation

```
$ npm install --save @konfirm/type
```

### Usage
As the type library as a scoped package, the scope is also need when the library is used.

```js
const Type = require('@konfirm/type');
```

The `Type` library is fully static, so it is ready for immediate use.

```js
const Type = require('@konfirm/type');

console.log(Type.getTypeName(Type));  //  function
```

## API

### `<string?> getTypeName(value [, real = true])`
Get the type name, for objects and functions the real (actual) name can be obtained (the default behavior).

```js
const Type = require('@konfirm/type');

console.log(Type.getTypeName('hello');      //  string
console.log(Type.getTypeName(Infinity);     //  number

const test = Promise.resolve();

console.log(Type.getTypeName(Promise);      //  Promise
console.log(Type.getTypeName(test);         //  Promise
console.log(Type.getTypeName(test, false);  //  object
```

### `<boolean> instanceOf(type, value)`
Determine whether the value is an instance of a specific type.

```js
const Type = require('@konfirm/type');
const test = Promise.resolve();

console.log(Type.instanceOf('Promise', test);  //  true
```

### `<boolean> is(type, value)`
Is the value of the specified type.

```js
const Type = require('@konfirm/type');

console.log(Type.is('boolean', false));  //  true
console.log(Type.is('boolean', true));   //  true
console.log(Type.is('boolean', null));   //  false
```

### `<string?> objectName(value)`
Get the name of given (object) input.

```js
const Type = require('@konfirm/type');
const test = Type;

const result = Type.objectName(test);

console.log(result);  //  Type
```

### `<string?>  functionName(value)`
Get the function name of given input.

```js
function helloWorld() {
	return 'hi';
}

const Type = require('@konfirm/type');
const test = helloWorld;

const result = Type.functionName(test);

console.log(result);  //  helloWorld
```


## Licence

MIT License

Copyright (c) 2018 Konfirm

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
