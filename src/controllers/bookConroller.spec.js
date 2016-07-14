import bookController from "./bookController";
import expect from "expect";
import sinon from "sinon";
import Book from "../models/book";



describe("Book Controller", () => {

    describe("GetAll", () => {

        it("status of 200 returned when a successful get is made", () => {
            let expected = 200;
            let dataAccessMock = {
                getAllBooks: function (callback) {
                    const book = {
                        author: "Oleg Shalygin"
                    };
                    callback(null, book);
                }
            };

            let sut = bookController(dataAccessMock);

            let request = {
                body: {
                    author: "Oleg Shalygin"
                }
            };

            let response = {
                status: function (statusCode) {
                    expect(statusCode).toEqual(expected);
                    return this;
                },
                json: function () { }
            };

            sut.get(request, response);

        });

        it("the object returned from the api is a book", () => {
            let expected = "Oleg Shalygin";

            let dataAccessMock = {
                getAllBooks: function (callback) {
                    const book = {
                        author: "Oleg Shalygin"
                    };
                    callback(null, book);
                }
            };

            let sut = bookController(dataAccessMock);

            let request = {
                body: {
                    author: "Oleg Shalygin"
                }
            };

            let response = {
                status: function (statusCode) {
                    return this;
                },
                json: function (book) {
                    let actual = book.author;
                    expect(actual).toEqual(expected);
                 }
            };

            sut.get(request, response);

        });


    });
});
