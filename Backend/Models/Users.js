const mongoose = require("mongoose")
const Infouser = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    number: {
        type: String,
        required: true,
        minlength: [10, "Enter Valid Number"],
        maxlength: [10, "Enter Valid Number"],
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be Greater than 8 characters"]
    },

})

//Create Model

const Users = mongoose.model("Users", Infouser);

module.exports = Users;