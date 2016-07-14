import "./bookDb";
import mongoose from "mongoose";
import bookModel from "../models/book";
import colors from "colors";
mongoose.Promise = global.Promise;


export function getAllBooks(callback) {
    // let query = {};
    // if (!!request.query && request.query.genre) {
    //     query.genre = request.query.genre;
    // }

    // let bookPromise = Book.find(query).exec();
    // bookPromise
    //     .then(books => {
    //         return books;
    //     })
    //     .catch(error => {
    //         console.log(error.red);
    //         return null;
    //     });

    let bookPromise = bookModel.find().exec();
    bookPromise
        .then(books => {
            callback(null, books);
        })
        .catch(err => {
            console.log(err.red);
            callback(error)
        });
}

// export function saveBook(request, response) {
//     let book = new Book(request.body);

//     let bookPromise = book.save();
//     bookPromise
//         .then(savedBook => {
//             console.log(savedBook);
//             response
//                 .status(200);
//             // .json(savedBook);
//         })
//         .catch(error => {
//             response
//                 .status(500)
//                 .json(error);
//         });

// }

// export function bookIdMiddleware(request, response, next) {
//     let bookId = request.params.id;

//     let bookPromise = Book.findById(bookId).exec();
//     bookPromise
//         .then(book => {
//             if (!!book) {
//                 request.book = book;
//                 next();
//             }
//             else {
//                 response.sendStatus(404);
//             }
//         })
//         .catch(error => {
//             response
//                 .status(500)
//                 .json(error);
//         });
// }

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
