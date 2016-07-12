import express from "express";
import mongoose from "mongoose";
import "../dataAccess/bookDb";
import Book from "../models/book";
mongoose.Promise = global.Promise;

let bookController = express.Router();

// {api/books}
bookController
    .route("/book")
    .get(function (request, response) {
        let query = {};
        if (!!request.query && request.query.genre) {
            query.genre = request.query.genre;
        }

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

bookController
    .route("/book")
    .post(function (request, response) {
        let book = new Book(request.body);

        let bookPromise = book.save();
        bookPromise
            .then(savedBook => {
                response.status(201).send(savedBook);
            })
            .catch(error => {
                response.status(500).send(error);
            });
    });

// {api/book/:id}
bookController.route("/book/:id")
    .get(function (request, response) {
        let bookId = request.params.id;

        let bookPromise = Book.findById(bookId).exec();
        bookPromise
            .then(book => {
                if (!!book) {
                    response.json(book);
                }
                response.sendStatus(404);
            })
            .catch(error => {
                response
                    .status(500)
                    .send(error);
            });

    });

export default bookController;