import express from "express";

// import * as bookDal from "../dataAccess/bookDal";

// let db = mongoose.connect("mongodb://localhost/bookApi");
import db from "../dataAccess/bookResourceDb";
import Book from "../models/book";
// let Book = require("../models/book");

let bookController = express.Router();

bookController
    .route("/book")
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

export default bookController;