const { type } = require("express/lib/response");
const moongoose = require("mongoose");


const ListSchema = new moongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },

    type: {
        type: String,
    },
    genre: {
        type: String
    },
    isSeries: {
        type: Boolean,
        default: false
    },
    contant: {
        type: Array
    }

}, { timestamps: true })


module.exports = moongoose.model("List", ListSchema);