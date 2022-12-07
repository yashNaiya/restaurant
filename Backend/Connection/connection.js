const express = require('express');
var mongoose = require('mongoose');

const app = express()

mongoose.connect("mongodb+srv://kashyap1234:kashyap1234@cluster0.vgelwbe.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("Connection successfull...."))
.catch((err) => console.log(err));