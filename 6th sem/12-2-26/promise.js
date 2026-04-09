const myPromise = new Promise((resolve)=>{
    setTimeout(()=>{
        const success = Math.random()>0.5;
        if(success){
            resolve('operation completed successfully');
        }
        else{
            reject(new Erro('operation failed'));
        }
    },1000);
});

myPromise
    .then(result =>console.log('success:', result))
    .catch(error =>console.log('error:', error.message))