import express from "express";

let bookController = express.Router();

bookController
    .route("/")
    .get((request, response) => {
        let book = {
            id: "1",
            title: "Clean Codezz!!!",
            description: "Some book about clean code and such",
            pageLength: 1349
        };
        response.json(book);
    });

export default bookController;