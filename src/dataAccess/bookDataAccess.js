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

export function updateBook(book, callback) {

    let bookPromise = book.save();
    bookPromise
        .then(updatedBook => {
            callback(null, updatedBook);
        })
        .catch(error => {
            callback(error);
        });
}

export function patchBook(book, callback) {

    let bookToUpdate = Object.assign({}, book);
    if (!!bookToUpdate._id) { delete bookToUpdate._id };
    if (!!bookToUpdate._v) { delete bookToUpdate._v };

    let bookPromise = bookToUpdate.save();
    bookPromise
        .then(updatedBook => {
            callback(null, updatedBook);
        })
        .catch(error => {
            callback(error);
        });
}

export function deleteBook(bookId, callback) {

    let deletionPromise = Book.findByIdAndRemove(bookId);
    deletionPromise
        .then(deletedBook => {
            callback(null, deletedBook);
        })
        .catch(error => {
            callback(error);
        });
}
