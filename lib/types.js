const isNumber = val => typeof val === 'number';
const isString = val => typeof val === 'string';
const isBoolean = val => typeof val === 'boolean';
const isArray = val => Array.isArray(val);
const isObject = val => val && typeof val === 'object' && val.constructor === Object;
const isFunction = val => typeof val === 'function';

const castToNumber = val => {
  if(isNumber(val)) return val;
  const number = Number(val);
  if(isNaN(number)) throw new CastError(Number, val);
  return number;
};

const castToString = val => {
  if(isString(val)) return val;
  const string = val.toString();
  if(typeof string != 'string') {
    throw `Cannot cast >>${val}<< to String`;
  }
  return string;
};

const castToBoolean = val => {
  if(isBoolean(val)) return val;
  const boolean = Boolean(val);
  if(!isBoolean(boolean)){
    throw `Cannot cast >>${val}<< to Boolean`;
  } 

  return boolean;
};

class CastError extends Error {
  constructor(Type, value) {
    const type = Type.name;
    super(`Cannot cast >>${value}<< to ${type}`);
    this.type = type;
    this.value = value;
  }
}

const casters = {
  Number: castToNumber,
  String: castToString,
  Boolean: castToBoolean,
};

const getCaster = Type => {  
  return casters[Type.name] || null;
};

module.exports = {
  isNumber,
  isString,
  isFunction,
  CastError,
  getCaster,
  castToNumber,
  castToString,
  castToBoolean,
  isBoolean,
  isArray,
  isObject
};
