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
                response
                    .status(200)
                    .json(books);
            })
            .catch(error => {
                response
                    .status(500)
                    .json(error);
            });
    });

bookController
    .route("/book")
    .post(function (request, response) {
        let book = new Book(request.body);

        let bookPromise = book.save();
        bookPromise
            .then(savedBook => {
                response
                    .status(200)
                    .json(savedBook);
            })
            .catch(error => {
                response
                    .status(500)
                    .json(error);
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
                .json(error);
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
                    .json(updatedBook);
            })
            .catch(error => {
                response
                    .status(500)
                    .json(error);
            });
    });

bookController
    .route("/book/:id")
    .patch(function (request, response) {
        if (!!request.book._id) {
            delete request.body._id;
        }

        if (!!request.book._v) {
            delete request.body._v;
        }

        let book = request.book;
        for (let key in request.body) {
            book[key] = request.body[key];
        }

        let bookPromise = book.save();
        bookPromise
            .then(updatedBook => {
                response
                    .status(200)
                    .json(updatedBook);
            })
            .catch(error => {
                response
                    .status(500)
                    .json(error);
            });
    });

bookController
    .route("/book/:id")
    .delete(function (request, response) {

        console.log(request.book._id);
        if (!request.book._id) {
            response
                .sendStatus(400);
        }
        let bookId = request.book._id;

        let deletionPromise = Book.findByIdAndRemove(bookId);
        deletionPromise
            .then(deletedBook => {
                response
                    .status(200)
                    .json(deletedBook);
            })
            .catch(error => {
                response
                    .status(500)
                    .json(error);

            });
    });

export default bookController;