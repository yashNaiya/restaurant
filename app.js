const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
const path = require('path');
require("./Connection/connection")
const dotenv = require('dotenv')

dotenv.config({path:"././config.env"})

const User = require("./Models/Users") 
app.use(cookieParser())
app.use(express.json())


app.use(express.static(path.join(__dirname, "./build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.use(require('./router/auth'))


app.listen(process.env.PORT,()=>{
    console.log(`Be Started at port ${process.env.PORT}`)
 })