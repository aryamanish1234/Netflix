const { type } = require("express/lib/response");
const moongoose = require("mongoose");


const UserSchema = new moongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true
    },

    Photo: {
        type: String,
        default: " "
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


module.exports = moongoose.model("User", UserSchema);