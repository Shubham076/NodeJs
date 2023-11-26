

## Background: Import CommonJs module in typescript

When working with TypeScript, a specific configuration item, `esModuleInterop`, plays a crucial role in how module loading is handled during the compilation process. Changing this setting from `false` to `true` can lead to unexpected behaviors in your code. This was observed during an image upload process, where altering the `esModuleInterop` setting resulted in error codes. 

Consider the following TypeScript code snippet that led to the issue:

```typescript
import * as XXX from '@xxx';

const obj = new XXX({
  accesstoken: config.accessToken,
});
``` 

After changing the `esModuleInterop` setting, the following error was reported:

kotlinCopy code

`TypeError: XXX is not a constructor` 

This error indicates a problem with how the module `XXX` is imported and instantiated.

## Common Solutions to the Problem

To resolve the issue, two main approaches are generally considered:

1.  **Reverting the `esModuleInterop` Setting**:
    -   Set `esModuleInterop` back to `false`.
    -   Modify the module import mode in the new code to match this setting.
2.  **Changing the Import Syntax**:
    -   Alter the existing import statement from `import * as XXX from '@xxx';` to `import XXX from '@xxx';`.

By applying these solutions, the issue is often resolved quickly. However, this raises questions about the deeper mechanics of the `esModuleInterop` feature. Understanding how this setting influences TypeScript's compilation process, especially concerning the differences between CommonJS and ES Module specifications, is essential for more informed code management.

## Diving Deeper: CommonJS vs. ES Module

### Introduction to ES Module Syntax

ES Modules are a standard in modern JavaScript and TypeScript development. Here's an example of defining an ES Module:


`export const foo = 'foo';
class Foo {};
export default Foo;` 

In this example:

-   `Import Foo from './foo'` imports the default export from the module, which is the `Foo` class.
-   `Import * as foo from './foo'` imports all exports from the module, resulting in an object like `{ foo: 'foo', default: Foo }`.

### Introduction to CommonJS Syntax

CommonJS is another module system used mainly in Node.js environments. The equivalent CommonJS syntax for the above ES Module example would be:


`exports.foo = 'foo',
class Foo {};
exports.default = Foo;` 

Here, `exports.foo` attaches `foo` to the module's exports, and `exports.default` sets the default export as the `Foo` class.

## TypeScript's Compilation Strategy

TypeScript, by default, uses the ES Module specification. However, when targeting Node.js or environments that primarily use CommonJS, TypeScript must transpile ES Modules into CommonJS-compatible code. The `esModuleInterop` setting plays a critical role in how this transpilation is handled, particularly concerning default imports and exports.

### Compilation with `esModuleInterop` as False

When `esModuleInterop` is set to `false`, TypeScript's default compilation behavior includes:

-   `import * as foo from 'abc'` is compiled to `const foo = require('abc')`.
-   `import foo, { bar } from 'abc'` is compiled to `const foo_1 = require('abc')`, with subsequent adjustments to module usage in the code.

Developers need to be mindful of how CommonJS modules are exported when importing them into TypeScript code, as inconsistencies in export styles can lead to errors like the one initially encountered.

### Compilation with `esModuleInterop` as True

Setting `esModuleInterop` to `true` enables a compatibility mode where TypeScript patches differences between CommonJS and ES Module exports. It introduces helper methods like `__importDefault` and `__importStar` to smooth out these differences.

#### Description of `__importDefault`

The `__importDefault` method is used when importing a module using the default import syntax (e.g., `import XX from 'abc'`). This method helps to handle scenarios where a CommonJS module does not have a default export, allowing for more flexible import syntax.

```

{ 
  "default": require('A CommonJS module')
}
```

Similar to the fs module, we can directly use the  `import fs from 'fs'`  to import the content exported by CommonJS:

```
import fs from 'fs'
fs.readFileSync();

// The pseudo code after compilation is shown as follows:

const fs = __importDefault(require('fs'));
// In this case, fs = { default: { readFileSync, writeFileSync} };
fs.default.readFileSync();
```

#### Description of `__importStar`

When  `import * as XX from 'abc'`  is used to import all syntax, it will be compiled as:  `const XX=__importStar(require('abc').`

`ImportStar`  is an upgraded version of the  `importDefault`. In addition to the  `default`  attribute set as the exported module, all enumerable attributes of the imported module (excluding prototype chain inheritance) will be proxied.

```
import * as fs from 'fs'
fs.readFileSync();

// The pseudo code after compilation is shown as follows:

const fs = __importStar(require('fs'));
// In this case, fs = { readFileSync, writeFileSync, default: { readFileSync, writeFileSync} };

fs.readFileSync();
```

### Conclusion

- It means that if `esModuleInterop`  is enabled typescript uses the `__importDefault` method which adds the default key and now we can import the common js module like esm module
- We can also import the individual properties of module that is imported as mentioned above in `__importStar` method

