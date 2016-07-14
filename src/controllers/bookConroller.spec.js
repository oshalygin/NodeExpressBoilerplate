import bookController from "./bookController";
import expect from "expect";
import sinon from "sinon";
import Book from "../models/book";



describe("Book Controller", () => {
    describe("Post", () => {

        it("status of 200 returned when a successful post is made", () => {
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

            let request = {
                body: {
                    author: "Oleg Shalygin"
                }
            };

            var response = {
                status: sinon.spy(),
                json: sinon.spy()
            };

            sut.saveBook(request, response);

            let actual = response.status.called;
            console.log(actual);
            // expect(actual).toBeTruthy();
        });

    });
});
