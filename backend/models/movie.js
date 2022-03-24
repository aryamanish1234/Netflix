const { type } = require("express/lib/response");
const moongoose = require("mongoose");


const MovieSchema = new moongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },

    desc: {
        type: String,
    },

    img: {
        type: String
    },
    imgTitle: {
        type: String
    },
    trailer: {
        type: String
    },
    video: {
        type: String
    },
    year: {
        type: String
    },
    limits: {
        type: String
    },
    genre: {
        type: String
    },
    isSeries: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


module.exports = moongoose.model("Movie", MovieSchema);