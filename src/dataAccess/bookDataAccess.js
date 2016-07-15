/* eslint-disable no-console */
import "./bookDb";
import mongoose from "mongoose";
import bookModel from "../models/book";
import colors from "colors";
mongoose.Promise = global.Promise;


export function getAllBooks(query, callback) {

    let queryCriteria = {};
    if (!!query && query.genre) {
        queryCriteria.genre = query.genre;
    }

    let bookPromise = bookModel.find(queryCriteria).exec();
    bookPromise
        .then(books => {
            callback(null, books);
        })
        .catch(error => {
            console.log(error.red);
            callback(error);
        });
}

export function saveBook(entity, callback) {
    let book = new bookModel(entity);

    let bookPromise = book.save();
    bookPromise
        .then(savedBook => {
            callback(null, book);
        })
        .catch(error => {
            callback(error)
        });
}


export function bookIdMiddleware(bookId, callback) {

    let bookPromise = bookModel.findById(bookId).exec();
    bookPromise
        .then(book => {
            if (!!book) {
                callback(null, book);
            }
            else {
                callback();
            }
        })
        .catch(error => {
            callback(error);
        });
}



// export function getBook(request, response) {
//     response.send(request.book);
// }

// export function updateBook(request, response) {
//     let book = request.book;
//     book.title = request.body.title;
//     book.genre = request.body.genre;
//     book.author = request.body.author;
//     book.read = request.body.read;

//     let bookPromise = book.save();
//     bookPromise
//         .then(updatedBook => {
//             response
//                 .status(200)
//                 .json(updatedBook);
//         })
//         .catch(error => {
//             response
//                 .status(500)
//                 .json(error);
//         });
// }

// export function patchBook(request, response) {
//     if (!!request.book._id) {
//         delete request.body._id;
//     }

//     if (!!request.book._v) {
//         delete request.body._v;
//     }

//     let book = request.book;
//     for (let key in request.body) {
//         book[key] = request.body[key];
//     }

//     let bookPromise = book.save();
//     bookPromise
//         .then(updatedBook => {
//             response
//                 .status(200)
//                 .json(updatedBook);
//         })
//         .catch(error => {
//             response
//                 .status(500)
//                 .json(error);
//         });
// }

// export function deleteBook(request, response) {

//     if (!request.book._id) {
//         response
//             .sendStatus(400);
//     }
//     let bookId = request.book._id;

//     let deletionPromise = Book.findByIdAndRemove(bookId);
//     deletionPromise
//         .then(deletedBook => {
//             response
//                 .status(200)
//                 .json(deletedBook);
//         })
//         .catch(error => {
//             response
//                 .status(500)
//                 .json(error);

//         });
// }
