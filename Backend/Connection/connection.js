const express = require('express');
var mongoose = require('mongoose');

const app = express()

mongoose.connect("mongodb://0.0.0.0:27017/Restaurant")
.then(() => console.log("Connection successfull...."))
.catch((err) => console.log(err));