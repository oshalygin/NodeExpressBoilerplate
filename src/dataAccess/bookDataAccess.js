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
            callback(error);
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

export function updateBook(currentEntity, updateEntity, callback) {
    let updateBook = new bookModel(currentEntity);

    updateBook.read = updateEntity.read;
    updateBook.title = updateEntity.title;
    updateBook.author = updateEntity.author;
    updateBook.genre = updateEntity.genre;

    let bookPromise = updateBook.save(updateBook);
    bookPromise
        .then((newlyUpdatedBook) => {
            callback(null, newlyUpdatedBook);
        })
        .catch(error => {
            callback(error);
        });
}

export function patchBook(currentEntity, patchEntity, callback) {

    let parsedBook = Object.assign({}, patchEntity);
    if (!!parsedBook._id) { delete parsedBook._id; }
    if (!!parsedBook._v) { delete parsedBook._v; }

    let mappedBook = currentEntity;
    for (let key in parsedBook) {
        mappedBook[key] = parsedBook[key];
    }

    let bookToUpdate = new bookModel(mappedBook);
    let bookPromise = parsedBook.save();
    bookPromise
        .then(updatedBook => {
            callback(null, updatedBook);
        })
        .catch(error => {
            callback(error);
        });
}

export function deleteBook(bookId, callback) {

    let deletionPromise = bookModel.findByIdAndRemove(bookId);
    deletionPromise
        .then(deletedBook => {
            callback(null, deletedBook);
        })
        .catch(error => {
            callback(error);
        });
}
