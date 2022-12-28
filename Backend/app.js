const express = require("express");
const app = express();
require("./Connection/connection")

const User = require("./Models/Users")

app.use(express.json())

const middleware = (req,res,next)=>{
    console.log('middleware is running');
    next();
}

app.use(require('./router/auth'))


app.listen(9002,()=>{
    console.log("Be Started at port 9002")
 })