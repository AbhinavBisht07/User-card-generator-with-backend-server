const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: String,
    profileURL: String,
    role: String,
    bio: String,
    email: String
})

const userModel = mongoose.model("users", userSchema); 


module.exports = userModel;