import express from "express";
// import * as bookDal from "../dataAccess/bookDal";

import mongoose from "mongoose";
// let db = mongoose.connect("mongodb://localhost/bookApi");
var db = mongoose.connect('mongodb://localhost/bookAPI');
let Book = require("../models/book");

let bookController = express.Router();

bookController
    .route("")
    .get(function(req,res){

        var query = {};

        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }
        Book.find(query, function(err,books){
            if(err)
                res.status(500).send(err);
            else
                res.json(books);
        });
    });


        // let books = bookDal.getAllBooks();
        // console.log(books);

        // response.send(books);

export default bookController;