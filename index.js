const express = require('express');

const port = 8000;

const app = express();

app.get('/',function(req,res){
    res.send('<h1>Hello</h1>')
})


app.listen(port,function(err){
    if(err){
        console.log('cannot start the server')
    }else{
        console.log('Server is started')
    }
})