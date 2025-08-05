
## 📘 Jest Unit Testing Examples

This document demonstrates common Jest unit testing patterns including mocking modules, promises, spying, and config file handling.

----------

### 📦 1. Mocking a Module

```js
// math.js 
export  const  add = (a, b) => a + b;
export  const  subtract = (a, b) => a - b;`
```
```js
// __tests__/math.test.js
import * as math from '../math';

jest.mock('../math');

test('mock add method', () => {
  math.add.mockImplementation((a, b) => 100);
  expect(math.add(2, 3)).toBe(100);
});

```
----------

### 🔁 2. `mockImplementation`

```js
const fetchData = jest.fn();

fetchData.mockImplementation((url) => {
  if (url === '/users') return ['Alice', 'Bob'];
  return [];
});

test('fetch users', () => {
  const result = fetchData('/users');
  expect(result).toContain('Alice');
});

```

----------

### ❌ 3. Mock Function That Throws

```js
const dangerFn = jest.fn(() => {
  throw new Error('Boom!');
});

test('throws error', () => {
  expect(() => dangerFn()).toThrow('Boom!');
});

```

----------

### 🌐 4. Mocking Promises

#### ✅ `mockResolvedValue`

```js
const getUser = jest.fn().mockResolvedValue({ id: 1, name: 'Jane' });

test('resolves user', async () => {
  await expect(getUser()).resolves.toEqual({ id: 1, name: 'Jane' });
});

```


#### ❌ `mockRejectedValue`

```js
const getUser = jest.fn().mockRejectedValue(new Error('Not found'));

test('rejects with error', async () => {
  await expect(getUser()).rejects.toThrow('Not found');
});

```

----------

### ✅ 5. Multiple `expect` Statements

```js
const sum = (a, b) => a + b;

test('multiple assertions', () => {
  const result = sum(2, 3);
  expect(result).toBe(5);
  expect(typeof result).toBe('number');
  expect(result).not.toBe(10);
});

expect(value).toBe(5);                    // strict equality
expect(value).toEqual({ x: 1 });          // deep equality
expect(value).not.toBe(null);             // negation


expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeDefined();
expect(value).toBeUndefined();


expect(10).toBeGreaterThan(5);
expect(3.14).toBeCloseTo(3.1, 1);         // precision
expect('Hello world').toMatch(/world/);   // regex match


expect([1, 2, 3]).toContain(2);
expect(new Set([1, 2])).toContain(1);


expect(() => throwError()).toThrow('Boom');
await expect(asyncFn()).rejects.toThrow('Error');


await expect(Promise.resolve('OK')).resolves.toBe('OK');
await expect(Promise.reject('FAIL')).rejects.toBe('FAIL');

const fn = jest.fn();
fn('hello');

expect(fn).toHaveBeenCalled();
expect(fn).toHaveBeenCalledWith('hello');
expect(fn).toHaveBeenCalledTimes(1);


```

----------

### 👁️ 6. Spying on Methods

```
const logger = {
  info: (msg) => console.log('INFO:', msg),
};

test('spy on logger', () => {
  const spy = jest.spyOn(logger, 'info');
  logger.info('Server started');
  expect(spy).toHaveBeenCalledWith('Server started');
});

```

## 🔹 `toBe`: **Strict Equality (`===`)**

-   Checks for **primitive equality or reference equality**
    
-   Uses JavaScript's `===` operator under the hood

```js
test('strict equality', () => {
  const a = 5;
  const b = 5;

  expect(a).toBe(b); // ✅ Passes
});

test('fails on different object references', () => {
  const obj1 = { x: 1 };
  const obj2 = { x: 1 };

  expect(obj1).toBe(obj2); // ❌ Fails: different references
});


test('deep equality for objects', () => {
  const obj1 = { x: 1 };
  const obj2 = { x: 1 };

  expect(obj1).toEqual(obj2); // ✅ Passes
});


test('deep equality for arrays', () => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2, 3];

  expect(arr1).toEqual(arr2); // ✅ Passes
});

```


----------


### ✅ Good Practices

-   Use `jest.clearAllMocks()` or `jest.resetAllMocks()` in `beforeEach`.
    
-   Prefer `mockImplementationOnce` for sequential calls.
    
-   Group related tests in `describe()` blocks.
    

----------
