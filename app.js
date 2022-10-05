const express = require("express"); //Express.js 사용할거다~~
const port = 3000;
const app = express(); //app은 express 함수 사용할거다 라는 객체 선언
const connect = require("./schemas/index.js");
connect();
const router = require("./routes/index.js")


app.use(express.json());

app.use('/api', router)

app.listen(port, () => {
    console.log(port, '포트로 서버 열림')
})