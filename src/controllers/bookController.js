import express from "express";
import * as dataAccessApi from "../dataAccess/bookDataAccess";

export default function bookController(dataAccess = dataAccessApi) {

    return {
        get,
        getById,
        post,
        update,
        patch,
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
        let bookToUpdate = request.body;
        dataAccess.updateBook(bookToUpdate, function (error, updatedBook) {
            if (!!error) {
                response.status(500).json(error);
            }
            response.status(200).json(updatedBook);
        });
    }

    function patch(request, response) {
        let bookToPatch = request.body;
        dataAccess.patchBook(bookToPatch, function (error, patchedBook) {
            if (!!error) {

            }
            response.status(200).json(patchedBook);
        });
    }

    function deleteBook(request, response) {
        let bookId = request.body._id;
        dataAccess.deleteBook(bookid, function (error, deletedBook) {
            if (!!error) {
                response.status(500).json(error);
            }
            response.status(200).json(deletedBook);
        });
    }
}
