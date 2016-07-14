import express from "express";
import * as dataAccessApi from "../dataAccess/bookDataAccess";

export default function bookController(dataAcccess = dataAccessApi) {

    return {
        get
    };

    function get(request, response) {

        dataAcccess.getAllBooks(function (error, books) {
            if (!!error) {
                response.status(500);
            }
            response.status(200).json(books);
        });
    }
}
