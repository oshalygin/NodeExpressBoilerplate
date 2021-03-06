import express from "express";
import * as dataAccessApi from "../dataAccess/bookDataAccess";

export default function bookController(dataAccess = dataAccessApi) {

    return {
        get,
        getById,
        post,
        update,
        patch,
        deleteBook,
        bookIdMiddleWare
    };

    function bookIdMiddleWare(request, response, next) {
        let bookId = request.params.id;
        dataAccess.bookIdMiddleware(bookId, function (error, book) {
            if (!!error) {
                response.status(500).json(error);
            }
            if (!book) {
                response.sendStatus(404);
            }
            else {
                request.book = book;
                next();
            }
        });
    }

    function getById(request, response) {
        const book = request.book;
        response.status(200).json(book);
    }

    function get(request, response) {

        let query = request.query;
        dataAccess.getAllBooks(query, function (error, books) {
            if (!!error) {
                response.status(500).json(error);
            }
            response.status(200).json(books);
        });
    }

    function post(request, response) {
        let bookToSave = request.body;
        dataAccess.saveBook(bookToSave, function (error, savedBook) {
            if (!!error) {
                response.status(500).json(error);
            }
            response.status(201).json(savedBook);
        });
    }

    function update(request, response) {

        let currentBook = request.book;
        let bookToUpdate = request.body;

        dataAccess.updateBook(currentBook, bookToUpdate, function (error, updatedBook) {
            if (!!error) {
                response.status(500).json(error);
            }
            response.status(200).json(updatedBook);
        });
    }

    function patch(request, response) {

        let currentBook = request.book;
        let bookToPatch = request.body;

        dataAccess.patchBook(currentBook, bookToPatch, function (error, patchedBook) {
            if (!!error) {
                response.status(500).json(error);
            }
            response.status(200).json(patchedBook);
        });
    }

    function deleteBook(request, response) {

        let bookId = request.book._id;

        dataAccess.deleteBook(bookId, function (error, deletedBook) {
            if (!!error) {
                response.status(500).json(error);
            }
            response.status(200).json(deletedBook);
        });
    }
}
