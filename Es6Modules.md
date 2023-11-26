
# ES6 Modules and Exports

ES6 (ECMAScript 2015) introduced native support for modules in JavaScript. ES6 modules provide a standardized way to organize and share code between different parts of your application. This README explains how to use ES6 modules for exporting and importing values.

## Exporting in ES6 Modules

In ES6 modules, you can export values, classes, or functions using the `export` keyword. You can have multiple named exports and one default export per module.

### Named Exports:

-   Use `export` followed by `const`, `let`, `function`, or `class` to define named exports.
-   For example
    
    ```
    // Named export
    export const a = 10;
    export const b = 20;
    ``` 
    

### Default Export:

-   Use `export default` to define the default export for a module.
-   There can only be one default export per module.
-   For example:
    
    ```
    // Default export
    export default someValue;
    ``` 
    

## Importing in ES6 Modules

In ES6 modules, you can import values from other modules using the `import` keyword. You can import both named exports and the default export.

### Named Imports:

-   Use curly braces `{}` to import specific named exports.
-   For example:
    
    javascriptCopy code
    
    ```
    // Named imports
    import { a, b } from './module';
    ``` 
    

### Default Import:

-   Import the default export using any variable name.
-   For example:
    
    ```
    // Default import
    import someValue from './module';
    ``` 
    

### Combining Named and Default Imports:

-   You can import both named and default exports in the same import statement.
-   For example:
    
    ```
    // Importing both named and default exports
    import someValue, { a, b } from './module';
    ```
- in this example `somvalue` is nothing but an alias for default key in the object exported from the module
