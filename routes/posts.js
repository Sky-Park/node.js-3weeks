const posts = require("../schemas/post.js");
const express = require("express");
const router = express.Router();

//1. 게시글 작성
router.post("/", async (req, res) => {
    const { user, password, title, content } = req.body;
    // body에 작성할 user의 정보 및 게시물의 title, content를 포함해서 받아온다.
    await posts.create({ user, password, title, content })
    //async / await문 통해서 동기 처리함으로써, DB에 등록 전까지 대기상태가됨.
    res.status(201).json({
        "message" : "게시글을 생성하였습니다."
    }) //status 201 의 경우 요청이 성공적이며 무언가 생성되었음을 알리는 코드이기에 사용
});

//2. 게시글 전체 조회 
router.get("/", async (req, res) => {
    const postlist = await posts.find().sort({createdAt: -1}); 
    // posts라는 스키마에 맞게 DB에서 정보를 꺼내옴 sort이용해서 날짜에따라 내림차순으로 만들어줌

    const post = postlist.map((post) => {
        return {
            postId: post._id,
            user: post.user,
            title: post.title,
            createdAt: post.createdAt
        };
        //map을 이용해서 DB에서 게시물의 id, user, title, createdAT의 대한 내용을 받아옴
    })
    res.json({ "data" : post })
})

//3. 게시글 상세보기
router.get("/:postId", async (req, res) => {
    
    const {postId} = req.params;
    //postId값 을 params에 담아서 가져옴
    const postdetail = await posts.findOne({_id: postId}, {"_id": 1, "user": 1, "title": 1, "content":1, "createdAt": 1});
    //post의 상세보기는 전체 posts에서 postId가 req.params와 같은 한가지를 찾아(findOne)서 그 중 필요한 정보 id, user, title, content, createdAt을 받아온다.
       
    res.json({ "data" : postdetail});
});

//4. 게시글 수정하기
router.put("/:postId", async (req, res) => {
    const {postId} = req.params;
    const {password, title, content} = req.body;
    //수정을 바디에 수정할 내용을 담아옴

    const postamend = await posts.findOne({_id: postId});
    // 수정할 게시물 찾기
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
});
//조건문 통해서 비밀번호 일치하면, 게시글 수정 일치하지 않으면 오류 반환

//5. 게시글 삭제하기
router.delete("/:postId", async (req, res) => {
    const {postId} = req.params;
    const {password} = req.body;
    //수정을 위한 비밀번호를 body로 받아옴
    const postdelete = await posts.findOne({_id: postId});
    if (password === postdelete.password) {
        await posts.deleteOne({_id: postId});
    } else {
        return res.status(400).json({"message": "비밀번호가 일치하지 않습니다"})
    }
    res.json({"message": "게시글을 삭제하였습니다."})
});
//마찬가지로 조건문 통해서 비밀번호 일치시 게시글 삭제, 아니면 오류반환

    


module.exports = router; // router를 모듈로써 내보냄