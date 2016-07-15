import express from "express";
import * as dataAccessApi from "../dataAccess/bookDataAccess";

export default function bookController(dataAcccess = dataAccessApi) {

    return {
        get,
        getById,
        post,
        bookIdMiddleWare
    };

    function bookIdMiddleWare(request, response, next) {
        let bookId = request.params.id;
        dataAcccess.bookIdMiddleware(bookId, function (error, book) {
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
        dataAcccess.getAllBooks(query, function (error, books) {
            if (!!error) {
                response.status(500);
            }
            response.status(200).json(books);
        });
    }

    function post(request, response) {
        let bookToSave = request.body;
        dataAcccess.saveBook(bookToSave, function (error, savedBook) {
            if (!!error) {
                response.status(500).json(error);
            }
            response.status(201).json(savedBook);
        });
    }
}
