const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: "first name is required",
        trim: true
    },
    lname: {
        type: String,
        required: "last name is required",
        trim: true
    },
    title:{
        type: String,
        enum : ["Mr","Mrs","Miss"],
        required : "title is required"
    },
    email:{
        type: String,
        unique: true,
        required: "Email is required",
        trim: true
    },
    password:{
        type: String,
        required: "Password is required"
    }
},{timestamps: true});

module.exports = mongoose.model("Author",authorSchema)