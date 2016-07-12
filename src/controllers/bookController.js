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

bookController.use("/book/:id", function (request, response, next) {
    let bookId = request.params.id;

    let bookPromise = Book.findById(bookId).exec();
    bookPromise
        .then(book => {
            if (!!book) {
                request.book = book;
                next();
            }
            else {
                response.sendStatus(404);
            }
        })
        .catch(error => {
            response
                .status(500)
                .send(error);
        });
});

bookController.route("/book/:id")
    .get(function (request, response) {
        response.send(request.book);
    });

bookController.route("/book/:id")
    .put(function (request, response) {
        let book = request.book;
        book.title = request.body.title;
        book.genre = request.body.genre;
        book.author = request.body.author;
        book.read = request.body.read;

        let bookPromise = book.save();
        bookPromise
            .then(updatedBook => {
                response
                    .status(200)
                    .send(updatedBook);
            })
            .catch(error => {
                response
                    .status(500)
                    .send(error);
            });
    });

bookController
    .route("/book/:id")
    .patch(function (request, response) {
        let book = request.book;
        if (!!book._id) {
            delete book._id;
        }

        if (!!book._v) {
            delete book._v;
        }

        for (let key in request.body) {
            console.log(key.red);
            book[key] = request.body[key];
        }

        let bookPromise = book.save();
        bookPromise
            .then(updatedBook => {
                response
                    .status(200)
                    .send(updatedBook);
            })
            .catch(error => {
                response
                    .status(500)
                    .send(error);
            });
    });

export default bookController;