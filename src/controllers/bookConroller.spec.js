import * as sut from "./bookController";
import expect from "expect";
import sinon from "sinon";
import Book from "../models/book";

describe("Book Controller", () => {
    describe("Post", () => {
        const Book = function (book) {
            this.save = () => { }
        };

        // sinon.stub(Book, bookStub);

        let request = {
            body: {
                author: "Oleg Shalygin"
            }
        };

        let response = {
            status: sinon.spy(),
            json: sinon.spy()
        };

        sut.saveBook(request, response);
        let actual = response.status.called;
        console.log(actual);

        // expect(actual).toBeTruthy();
    });
});

