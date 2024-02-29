const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Enter Username"]
    },
    email: {
        type: String,
        required: [true, "Enter Email"],
        unique: [true, "Email Already taken"]
    },
    password: {
        type: String,
        required: [true, "Enter Password"]
    },
}, {
    timestamp: true
});
module.exports = mongoose.model("Users", userSchema);