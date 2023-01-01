const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')

require("./Connection/connection")
const dotenv = require('dotenv')

dotenv.config({path:"././config.env"})

const User = require("./Models/Users") 
app.use(cookieParser())
app.use(express.json())


app.use(require('./router/auth'))


app.listen(process.env.PORT,()=>{
    console.log(`Be Started at port ${process.env.PORT}`)
 })