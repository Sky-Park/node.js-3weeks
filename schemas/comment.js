const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
    postId: {
        type :String,
        required: true
    },
    user: {
        type : String,
        required: true,
    },
    password: {
        type: Number,
        required: true,
    },
    content: {
        type: String
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("comments", commentSchema);