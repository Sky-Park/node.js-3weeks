const comments = require("../schemas/comment.js");
const express = require("express")
const router = express.Router();

//1. 댓글 작성
router.post("/:postId", async (req, res) => {

    const {postId} = req.params;

    const { user, password, content } = req.body;

    await comments.create({ postId, user, password, content });

    res.status(201).json({
        "message" : "댓글을 생성하였습니다."
    })
});

//2. 댓글 리스트 전체 조회 
router.get("/:postId", async (req, res) => {
    const {postId} = req.params;
    
    const commentlist = await comments.find({postId: postId}).sort({createdAt: -1}); // sort이용해서 날짜에따라 내림차순으로 만들어줌


    const comment = commentlist.map((comment) => {
        return {
            postId: comment._id,
            user: comment.user,
            title: comment.title,
            content: comment.content,
            createdAt: comment.createdAt
        };
    })

    res.json({ "data" : comment })
})

//3. 댓글 수정하기
router.put("/:commentId", async (req, res) => {
    const {commentId} = req.params;
    const {password, content} = req.body;

    const commentamend = await comments.findOne({_id: commentId});
    if (password === commentamend.password) {
        await comments.updateOne({_id: commentId}, {
            $set : {
                content: content
            }
        })
    } else { 
        return res.status(400).json({"message": '비밀번호가 일치하지 않습니다'})
    }
    res.status(201).json({"message": "댓글을 수정하였습니다."})
})

//5. 댓글 삭제하기
router.delete("/:commentId", async (req, res) => {
    const {commentId} = req.params;
    const {password} = req.body;

    const commentdelete = await comments.findOne({_id: commentId});
    if (password === commentdelete.password) {
        await comments.deleteOne({_id: commentId});
    } else {
        return res.status(400).json({"message": "비밀번호가 일치하지 않습니다"})
    }
    res.json({"message": "댓글을 삭제하였습니다."})
})

module.exports = router;