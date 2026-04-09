async function f(){
    let response = await fetch('https://xyzurl');
}
// f() becomes a rejected promise 
f().catch(alert);