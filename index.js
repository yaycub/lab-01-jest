const { isNumber, isString, isBoolean, isArray, isObject, isFunction } = require('./lib/types.js');

console.log(isNumber('3'));
console.log(isString('Hi'));
console.log(isBoolean(false));
console.log(isArray({}));
console.log(isObject({}));
console.log(isFunction(isString));
