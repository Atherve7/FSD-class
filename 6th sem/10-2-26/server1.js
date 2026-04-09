const fs = require('fs').promises;
async function readFileExample(){
    try{
        const data = await fs.readFile('myfile.txt','utf-8');
        console.log('file content:',data);
    } catch(err){
        console.error('Error reading file:',err);
    }
}
readFileExample();

const { read } = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(require('fs').readFile);
async function readwithPromisify(){
    try{
        const data = await readFileAsync('myfile.txt','utf-8');
        console.log(data);
    }catch(err){
        console.error(err);
    }
}
readwithPromisify();