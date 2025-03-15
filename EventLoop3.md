Behind the scene async await is syntatically sugar there is how it looks like.

#### Async await (example 1)
  ```
  async function example() {
    let result = await someAsyncFunction();
    console.log(result);
 }
  ```

```
function example() {
    someAsyncFunction().then(result => {
        console.log(result);
    });
}
```

#### Async await (example 2)

  ```
  async function example() {
    const result1 = await Promise.resolve("Hello");
    console.log(result1);  // Logs: "Hello"
    
    const result2 = await Promise.resolve("World");
    console.log(result2);  // Logs: "World"
    
    const result3 = await Promise.resolve("!");
    console.log(result3);  // Logs: "!"
}

example();

  ```
#### Behind the scenes converted to below promises
```
function example() {
    return Promise.resolve("Hello")
        .then(result1 => {
            console.log(result1);  // Logs: "Hello"
            return Promise.resolve("World");  // The second promise
        })
        .then(result2 => {
            console.log(result2);  // Logs: "World"
            return Promise.resolve("!");  // The third promise
        })
        .then(result3 => {
            console.log(result3);  // Logs: "!"
        });
}

example();

```

#### Async await (example 3)

  ```
async function main() {
    for (let i = 0; i < 10; i++) {
        await Promise.resolve(i);
    }
}
  ```
#### Behind the scenes converted to below promises
```
Here we are doing promise chaining. So after loops exists we have promise chain created
function main() {
    let promise = Promise.resolve();  // Start with a resolved Promise
    for (let i = 0; i < 10; i++) {
        promise = promise.then(() => {
            return Promise.resolve(i);  // Return a resolved Promise with the current value of i
        });
    }
    return promise;  
}

```

#### Summary of How the Chain Works:
- Each .then() returns a new promise, which ensures that the next .then() in the chain will not execute until the previous one has finished.
- The callbacks inside .then() are not executed immediately, they are scheduled in the microtask queue and run only after the promise resolves.
- This pattern ensures that each .then() waits for the promise from the previous .then() to resolve before its own callback is executed.
- the callback of the next .then() is scheduled only after the previous promise resolves! This creates a chain of asynchronous operations where each part executes sequentially, but the execution itself is non-blocking
