import express from "express";
import * as dataAccessApi from "../dataAccess/bookDataAccess";

export default function bookController() {

    return {
        // bookIdMiddleware,
        get
        // saveBook,
        // getBook,
        // updateBook,
        // patchBook,
        // deleteBook
    };

    function get(request, response) {

        dataAccessApi.getAllBooks(function (error, books) {
            if (!!error) {
                response.status(500);
            }
            response.status(200).json(books);
        });

    }
}
