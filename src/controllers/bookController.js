import express from "express";
import "../dataAccess/bookResourceDb";
import Book from "../models/book";

let bookController = express.Router();

bookController
    .route("/book")
    .get(function (request, response) {

        let query = {};

        if (request.query.genre) {
            query.genre = request.query.genre;
        }

        Book.find(query, (error, books) => {
            if (error) {
                response.status(500)
                    .send(error);
            }
            else {
                response.json(books);
            }
        });
    });

export default bookController;