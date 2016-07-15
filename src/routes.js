import express from "express";
import bookApi from "./controllers/bookController";

let router = express.Router();
let bookController = bookApi();
// {api/books}
router
    .route("/book")
    .get(bookController.get)
    .post(bookController.post);

// {api/book/:id}
router.use("/book/:id", bookController.bookIdMiddleWare);
router.route("/book/:id")
    .get(bookController.getById)
    .put(bookController.update)
    .patch(bookController.patch);
    // .delete(bookController.deleteBook);

export default router;