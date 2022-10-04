const posts = require("../schemas/post.js");
const express = require("express");
const router = express.Router();

//1. 게시글 작성
router.post("/", async (req, res) => {
    const { user, password, title, content } = req.body;

    await posts.create({ user, password, title, content })

    res.status(201).json({
        "message" : "게시글을 생성하였습니다."
    })
});

//2. 게시글 전체 조회 
router.get("/", async (req, res) => {
    const postlist = await posts.find();

    const post = postlist.map((post) => {
        return {
            postId: post._id,
            user: post.user,
            title: post.title,
            createdAt: post.createdAt
        };
    })
    res.json({ "data" : post })
})

//3. 게시글 상세보기
router.get("/:postId", async (req, res) => {
    
    const {postId} = req.params;

    const postdetail = await posts.findOne({_id: postId}, {"_id": 1, "user": 1, "title": 1, "content":1, "createdAt": 1});

       
    res.json({ "data" : postdetail});
});

//4. 게시글 수정하기
router.put("/:postId", async (req, res) => {
    const {postId} = req.params;
    const {password, title, content} = req.body;


    const postamend = await posts.findOne({_id: postId});
    if (password === postamend.password) {
        await posts.updateOne({_id: postId}, {
            $set : {
                title: title,
                content: content
            }
        })

    } else { 
        return res.status(400).json({"message": '비밀번호가 일치하지 않습니다'})
    }
    res.status(201).json({"message": "게시글을 수정하였습니다."})
})

//5. 게시글 삭제하기
router.delete("/:postId", async (req, res) => {
    const {postId} = req.params;
    const {password} = req.body;

    const postdelete = await posts.findOne({_id: postId});
    if (password === postdelete.password) {
        await posts.deleteOne({_id: postId});
    } else {
        return res.status(400).json({"message": "비밀번호가 일치하지 않습니다"})
    }
    res.json({"message": "게시글을 삭제하였습니다."})
})

    


module.exports = router;