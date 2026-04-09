async function getData() {
    console.log('Starting...');
    const result = await someAsyncOperation();
    console.log('Result:', result);
    return result;
}

function someAsyncOperation() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('Operation completed');
    }, 1000);
})}   

getData().then(data => console.log('Final data:', data));