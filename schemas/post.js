const mongoose = require("mongoose");
//mongoose 사용할거다~
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
//새로운 mongoose.schema를 만듦
module.exports = mongoose.model("posts", postSchema);
//모듈로 내보내 줄때, mongoose.model을 내보낼건데 그거 생긴게 postSchema처럼 생겼다~