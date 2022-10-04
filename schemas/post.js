const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    user: {
        type : String,
        required: true,
    },
    password: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
    },
    content: {
        type: String
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("posts", postSchema);