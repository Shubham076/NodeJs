
# CommonJS Modules and Exports

CommonJS is a module system used in JavaScript, primarily in server-side environments like Node.js. It provides a way to organize and encapsulate code into reusable modules. In CommonJS, there are two primary ways to export values or objects: using `exports` and `module.exports`. This README explains their behavior.

## `exports` vs. `module.exports`

### `exports`:

-   `exports` is an object initially created for you by CommonJS.
-   You can add properties or methods to `exports` to export them as named exports from the module.
-   Initially, both `exports` and `module.exports` point to the same empty object `{}`.
-   For example:
    
    ```
    // Exporting a function using exports
    exports.myFunction = () => {
      // Function logic here
    };
    ``` 
    

### `module.exports`:

-   `module.exports` is the actual object that gets exported as the public API of the module.
-   You can assign an object, a function, or any value to `module.exports` to define what the module exports.
-   If you reassign `module.exports`, it replaces the entire export.
-   Initially, both `exports` and `module.exports` point to the same empty object `{}`.
-   For example:
    
    ```
    // Exporting an object using module.exports
    module.exports = {
      a: 10,
      b: 20,
    };
    ``` 
    

## Exporting Multiple Values:

-   You can use either `exports` or `module.exports` to export multiple values from a module.
-   If using `exports`, add properties to it for each named export.
-   If using `module.exports`, assign an object containing your exports.

## Using Exports in Other Modules:

-   In other modules, you can import values exported using `exports` or `module.exports`.
-   For `exports`, use destructuring to access named exports.
-   For `module.exports`, import the entire object and access properties.

### Example:

```
// Module exporting using exports
exports.value1 = 'Value 1';
exports.value2 = 'Value 2';

// Module exporting using module.exports
module.exports = {
  a: 10,
  b: 20,
};
``` 

```
// Importing values from a CommonJS module
const { value1, value2 } = require('./myModule'); // exports
const myModule = require('./myModule'); // module.exports

console.log(value1); // 'Value 1'
console.log(myModule.a); // 10
```

- You should either use module.exports or exports but not both to avoid the confusion.
