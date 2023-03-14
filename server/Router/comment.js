const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
require('dotenv').config();

function format() {
    var args = Array.prototype.slice.call (arguments, 1);
    return arguments[0].replace (/\{(\d+)\}/g, function (match, index) {
       return args[index];
    });
 }

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.REACT_APP_MYSQLPASS,
    database: "comment",
});

router.get('/', (req, res) => {
    var sqlQuery = "SELECT id,nick,password,comment FROM comment.cmt WHERE link=" + "'" +  req.params[0] + "'"
    db.query(sqlQuery, (err,cmt) => {
        if(!err) res.json({ message: sqlQuery});
        else res.json({ message: err});
    })
})

router.post("/", (req, res) => {
    const bcry = bcrypt.genSalt(saltRounds, function(err, salt){
        bcrypt.hash(req.body.password, salt, function (err, hash){
            var info = "'" + req.body.nick + "'" + "," + "'" + hash + "'" + "," + "'" + req.body.comment + "'" + "," + "'" + req.body.link + "'" + ",NOW()"
            var sqlQuery = format("INSERT INTO cmt(nick,password,comment,link,date) VALUES ({0})", info)
            db.query(sqlQuery, (err,result) => {
                res.json({message: "댓글이 등록되었습니다."});
            })
        })
    })
})

router.put('/update', (req, res) => {
    var sqlQuery = "UPDATE comment.cmt SET comment=" + "'" + req.body.text + "'" + " WHERE id=" + req.body.id
    db.query(sqlQuery, (err,cmt) => {
        if(err) res.json({ message: err});
        else res.status(200).json({message: "수정되었습니다."});
    })
})

router.delete('/delete', (req, res) => {
    var sqlQuery = "DELETE FROM comment.cmt WHERE id=" + req.query.id
    db.query(sqlQuery, (err,cmt) => {
        if(err) res.json({ message: err});
        else res.status(200).json({message: "삭제되었습니다."});
    })
})

router.post('/*', (req, res) => {
    var sqlQuery = "SELECT id,nick,password,comment FROM comment.cmt WHERE link=" + "'" +  req.params[0] + "'"
    db.query(sqlQuery, (err,cmt) => {
        if(err) res.json({ message: err});
        else res.status(200).json(cmt);
    })
})

module.exports = router;
