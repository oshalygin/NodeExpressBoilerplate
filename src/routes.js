import express from "express";
import * as bookController from "./controllers/bookController";

let router = express.Router();

// {api/books}
router
    .route("/book")
    .get(bookController.getAllBooks)
    .post(bookController.saveBook);

// // {api/book/:id}
router.use("/book/:id", bookController.bookIdMiddleware);
router.route("/book/:id")
    .get(bookController.getBook)
    .put(bookController.updateBook)
    .patch(bookController.patchBook)
    .delete(bookController.deleteBook);

export default router;