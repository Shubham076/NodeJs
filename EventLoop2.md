```
async function fetchData() {
    console.log('1. Function start');

    // Simulating a network call using a fetch function
    let data = await fetch('https://example.com/data');
    console.log('3. Data received');

    // Process the data
    let processedData = process(data);
    console.log('4. Data processed');

    console.log('5. Function end');
}

fetchData();
console.log('2. Outside async function');

```
#### Lifecycle with Network Call and `await`

1.  **Call Stack**: `fetchData` is called and pushed onto the call stack.
2.  **Execution Begins**: Logs '1. Function start'.
3.  **Awaiting Network Call**:
    -   The `fetch` function is called to perform a network request. It returns a promise that is awaited.
    -   The execution of `fetchData` is paused until the fetch promise resolves.
    -   The call stack is not blocked; `fetchData` is removed from the call stack while waiting.
4.  **Continuing Execution**: Logs '2. Outside async function'.
5.  **Network Request Completes**:
    -   Once the network request completes, the `fetch` promise is resolved.
    -   The resolution of the promise is queued as a microtask.
6.  **Event Loop & Microtask Queue**:
    -   The event loop, upon finding the call stack empty, processes the microtask queue.
    -   The `await fetch` resolves, and execution within `fetchData` resumes.
    -   Logs '3. Data received'.
7.  **Processing Data**:
    -   The received data is processed (simulated by `process(data)`).
    -   Logs '4. Data processed'.
8.  **End of Function Execution**:
    -   Logs '5. Function end'. The function execution completes.
