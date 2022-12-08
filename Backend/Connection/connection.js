var mongoose = require('mongoose');

var url = "mongodb+srv://kashyap1234:kashyap1234@cluster0.vgelwbe.mongodb.net/Restaurant?retryWrites=true&w=majority";

mongoose.connect(url,).then(()=> {
    console.log('connection succesful');

}).catch((e)=> console.log('no connection'));

