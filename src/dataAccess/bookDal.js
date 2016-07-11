/* eslint-disable no-console */
import BookModel from "../models/book";
import mongoose from "./bookResourceDb";
import colors from "colors";

let Book = mongoose.model("Book", BookModel);

export function getAllBooks() {
    let result;

    Book.find((error, bookResponse) => {
        if (!!error) {
            console.log(error.red);
            return;
        }
        result = bookResponse;
        console.log(result.yellow);
    });

    return result;

}
