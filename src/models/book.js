import mongoose from "mongoose";
let Schema = mongoose.Schema;

let Book = new Schema({
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: false }
});

export default mongoose.model('books', Book);