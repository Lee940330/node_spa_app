const express = require('express');
const app = express();
const port = 3000;

const postRouter = require('./routes/post.js');
const commentRouter = require('./routes/comment.js');
const connect = require("./schemas");
connect();

app.use(express.json());
// localhost:3000/api -> goodsRouter  | 전역 미들웨어
app.use("/api", [postRouter, commentRouter]);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});