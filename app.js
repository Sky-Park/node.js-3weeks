const express = require("express"); //Express.js 사용할거다~~
const { get } = require("mongoose");
const app = express(); //app은 express 라는 객체 선언
const connect = require("./schemas");
connect();

app.use(express.json());

app.use('/api', [postsRouter, commentRouter])

app,get('/posts', (req, res) =>{
    
})

app.listen(3000, () => {
    console.log(3000, '포트로 서버가 열렸어요!')
})