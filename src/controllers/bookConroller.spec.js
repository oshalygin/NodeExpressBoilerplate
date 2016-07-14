import bookController from "./bookController";
import expect from "expect";
import sinon from "sinon";
import Book from "../models/book";



describe("Book Controller", () => {
    describe("Post", () => {
        const Book = function (book) {
            this.save = () => {
                return new Promise(function (resolve, reject) {
                    let savedBook = {
                        author: "Oleg Shalygin"
                    };
                    resolve(savedBook);
                });
            }
        };
        let sut = bookController(Book);
        // sinon.stub(Book, bookStub);

        let request = {
            body: {
                author: "Carlota Turcios"
            }
        };

        let response = {
            status: sinon.spy(),
            json: sinon.spy()
        };

        sut.saveBook(request, response);
        let actual = response.status.calledWith(200);
        console.log(actual);

        // expect(actual).toBeTruthy();
    });
});
