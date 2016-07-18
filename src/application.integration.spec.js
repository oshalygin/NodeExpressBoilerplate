import request from "supertest";
import mongoose from "mongoose";
import application from "./application";
import expect from "expect";

let Book = mongoose.model("books");
let agent = request.agent(application);

describe("API Integration Tests", () => {

    afterEach((done) => {
        Book.remove().exec();
        done();
    });

    it("When a book is posted successfully the response is 201 CREATED", (done) => {
        const bookToPost = {
            title: "Derp",
            author: "Oleg Shalygin",
            genre: "Non Fiction"
        };

        let expected = 201;

        agent.post("/api/book")
            .send(bookToPost)
            .expect(201)
            .end((error, response) => {
                let actual = response.status;
                expect(actual).toEqual(expected);
                done();
            });

    });

    it("When a book is posted successfully the default property of read is populated", (done) => {
        const bookToPost = {
            title: "Derp",
            author: "Oleg Shalygin",
            genre: "Non Fiction"
        };

        agent.post("/api/book")
            .send(bookToPost)
            .expect(201)
            .end((error, response) => {
                let actual = response.body.read;
                expect(actual).toNotBe(undefined);
                done();
            });

    });
});