import express from "express";
import mongoose from "mongoose";
import "../dataAccess/bookDb";
import Book from "../models/book";
mongoose.Promise = global.Promise;

let bookController = express.Router();

bookController
    .route("/book")
    .get(function (request, response) {
        let query = {};
        if (!!request.query && request.query.genre) {
            query.genre = request.query.genre;
        }
        console.log(query);

        let bookPromise = Book.find(query).exec();

        bookPromise
            .then(books => {
                response.
                    json(books);
            })
            .catch(error => {
                response
                    .status(500)
                    .send(error);
            });
    });

export default bookController;