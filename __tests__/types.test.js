const {
  isNumber,
  isString,
  isBoolean,
  castToNumber,
  castToString,
  castToBoolean,
  getCaster
} = require('../lib/types.js');

describe('validator module', () => {
  describe('basic validation', () => {
    it('properly tells if a value is a numbers', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });

    it('properly tells if a value is a string', () => {
      expect(isString('hi')).toBeTruthy();
      expect(isString('Hello World')).toBeTruthy();
      expect(isString('5')).toBeTruthy();
      expect(isString(4)).toBeFalsy();
      expect(isString([])).toBeFalsy();
    });

    it('properly tells if a value is a boolean', () => {
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean(false)).toBeTruthy();
      expect(isBoolean(1)).toBeFalsy();
      expect(isBoolean([])).toBeFalsy();
      expect(isBoolean({})).toBeFalsy();
    });
  });

  describe('casters', () => {
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });

    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });

    it('can cast values to a string', () => {
      expect(castToString(5)).toEqual('5');
      expect(castToString('hello')).toEqual('hello');
      expect(castToString({})).toEqual('[object Object]');
      expect(castToString([])).toEqual('');
    });

    it('can cast values to a boolean', () => {
      expect(castToBoolean(5)).toEqual(true);
      expect(castToBoolean(0)).toEqual(false);
      expect(castToBoolean([])).toEqual(true);
      expect(castToBoolean(null)).toEqual(false);
      expect(castToBoolean('hello')).toEqual(true);
      expect(castToBoolean({})).toEqual(true);
    });
  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(String)).toEqual(castToString);
    expect(getCaster(Boolean)).toEqual(castToBoolean);
    expect(getCaster(Promise)).toBeNull();
  });
});
