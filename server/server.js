const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const connect = require('./Schema/index');
connect(); // Model폴더의 index.js파일 실행

const options = {
  key: fs.readFileSync('/etc/ssl/private.key'),
  cert: fs.readFileSync('/etc/ssl/certificate.crt')
};

// 서버 세팅, 라우터 사용설정
app.use(express.json());
app.use(cors({origin: ['https://hanbat.what-eat.r-e.kr']}));
app.use(helmet());
app.disable('x-powered-by');
app.use("/", require("./Router/store")); // 기본 url(/)로 접속하면 store 라우터로 연결
app.use("/comment", require("./Router/comment"));

// node 서버 연결
https.createServer(options, app).listen(4000, function() {
    console.log("Connected to server")
});
