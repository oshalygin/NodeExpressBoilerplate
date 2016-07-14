import express from "express";
import * as dataAccessApi from "../dataAccess/bookDataAccess";

export default function bookController(dataAcccess = dataAccessApi) {

    return {
        get,
        post
    };

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
