const express = require('express');
const router = express.Router();
const store = require('../Schema/store');


router.get("/rice", (req, res) => {
    store.find({type: "한식"}, function(err, stor){
        if(err) res.json({ message: err});
        else res.status(200).json(stor);
    })
});

router.get("/china",  (req, res) => {
    store.find({type: "중식"}, function(err, stor){
        if(err) res.json({ message: err});
        else res.status(200).json(stor);
    })
});

router.get("/japan",  (req, res) => {
    store.find({type: "일식"}, function(err, stor){
        if(err) res.json({ message: err});
        else res.status(200).json(stor);
    })
});

router.get("/bunsik",  (req, res) => {
    store.find({type: "분식"}, function(err, stor){
        if(err) res.json({ message: err});
        else res.status(200).json(stor);
    })
});

router.get("/meat",  (req, res) => {
    store.find({type: "고기"}, function(err, stor){
        if(err) res.json({ message: err});
        else res.status(200).json(stor);
    })
});

router.get("/pizza",  (req, res) => {
    store.find({type: "피자"}, function(err, stor){
        if(err) res.json({ message: err});
        else res.status(200).json(stor);
    })
});

router.get("/chicken",  (req, res) => {
    store.find({type: "치킨"}, function(err, stor){
        if(err) res.json({ message: err});
        else res.status(200).json(stor);
    })
});

router.get("/burger",  (req, res) => {
    store.find({type: "햄버거"}, function(err, stor){
        if(err) res.json({ message: err});
        else res.status(200).json(stor);
    })
});

router.get("/cafe",  (req, res) => {
    store.find({type: "카페"}, function(err, stor){
        if(err) res.json({ message: err});
        else res.status(200).json(stor);
    })
});

router.get("/sul",  (req, res) => {
    store.find({type: "술"}, function(err, stor){
        if(err) res.json({ message: err});
        else res.status(200).json(stor);
    })
});

router.get("/bob",  (req, res) => {
    store.find({type2: "밥"}, function(err, stor){
        if(err) res.json({ message: err});
        else res.status(200).json(stor);
    })
});

router.get("/men",  (req, res) => {
    store.find({type2: "면"}, function(err, stor){
        if(err) res.json({ message: err });
        else res.status(200).json(stor);
    })
});


module.exports = router; // server.js에서 사용하기 위해 exports 필수