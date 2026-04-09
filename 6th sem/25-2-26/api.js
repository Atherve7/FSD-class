const express = require('express');
const app = express();
const PORT = 3000;

let books =[
    {
        id:1,
        title:"Book One",
        author: "F scott Fitzgerald",
    },
    {
        id:2,
        title:"Book Two",
        author: "George Orwell"
    }
]
app.get('/api/books',
(req,res)=>{
    res.json(books);    
});

app.get('/api/books/:id',(req,res)=>{
    const id= 
        parseInt(req.params.id);
    const book = 
        books.find(book=>book.id===id);
    if(book){
        res.json(book);
    }else{
        res.status(404).   
            json({message:"Book not found"});                   
    }
});
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

