import mongoose from "mongoose";

let Schema = mongoose.Schema();
let BookModel = new Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    genre: {
        type: String
    },
    read: {
        type: Boolean
    }
});

export default mongoose.model("Book", BookModel);