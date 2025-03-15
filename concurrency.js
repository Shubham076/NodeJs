const concurrentEachOfLimit = async function (list, concurrency, executor) {
    let worker = async (iterator, workerId) => {
        for (const item of iterator) {
            console.log(`worker:  ${workerId} processed item: ${item}`);
            await executor(item);
        }
    };

    let iterator = list.values();
    let workers = new Array(concurrency).fill(0).map((_, index) => worker(iterator, index));
    await Promise.all(workers);
};
