import express from "express";
// import * as bookDal from "../dataAccess/bookDal";

import mongoose from "mongoose";
let db = mongoose.connect("mongodb://localhost/bookApi");
let Book = require("../models/book");

let bookController = express.Router();

bookController
    .route("/")
    .get(function (request, response) {
        Book.find(function (err, books) {
            console.log(books);
            response.json(books);
        });



        // let books = bookDal.getAllBooks();
        // console.log(books);

        // response.send(books);
    });

export default bookController;