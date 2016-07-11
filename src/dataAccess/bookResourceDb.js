/* eslint-disable no-console */
import mongoose from "mongoose";
import colors from "colors";

mongoose.connect("mongodb://localhost/BookService", () => {
    console.log("Database connection opened to BookService".green);
});

export default mongoose;