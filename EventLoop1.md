```
function asyncExample() {
    console.log('1. Function start');

    setTimeout(() => {
        console.log('4. setTimeout callback');
    }, 0);

    Promise.resolve().then(() => {
        console.log('3. Promise callback');
    });

    console.log('2. Function end');
}

asyncExample();
```

### 1. Call Stack

-   The `asyncExample` function is called and placed on the call stack.
-   The first `console.log('1. Function start')` is executed.

### 2. Initiating Asynchronous Calls

-   `setTimeout` is called. Node.js registers the callback and sets up a timer. This task is handed off to the libuv library, so it's removed from the call stack.
-   The `Promise.resolve()` is immediately resolved, and its `.then` callback is scheduled as a microtask.

### 3. Continuing Execution

-   The last `console.log('2. Function end')` is executed. This concludes the execution of `asyncExample`, and it's popped off the call stack.

### 4. Microtask Queue

-   Before moving to the next phase (event loop checking the callback queue), the Node.js runtime processes the microtask queue.
-   The callback from `Promise.resolve().then(...)` is executed: `console.log('3. Promise callback')`.

### 5. Event Loop and Callback Queue

-   Now, the event loop checks the callback queue. Since the `setTimeout` delay was 0, it's very likely that by this time, the timeout has completed.
-   The callback from `setTimeout` is moved from the callback queue to the call stack and executed: `console.log('4. setTimeout callback')`.

### Lifecycle Summary in the Context of `asyncExample`:

1.  **Call Stack Execution:** '1. Function start' and '2. Function end' are logged.
2.  **Microtask Execution:** The promise callback logs '3. Promise callback'.
3.  **Event Loop Handling Callback Queue:** The `setTimeout` callback logs '4. setTimeout callback'.

This example demonstrates how synchronous code is executed first, followed by the microtasks (like promises), and then the tasks/callbacks (like `setTimeout`) in the next tick of the event loop. Understanding this flow is essential for writing efficient and predictable Node.js applications, especially when dealing with asynchronous operations.
