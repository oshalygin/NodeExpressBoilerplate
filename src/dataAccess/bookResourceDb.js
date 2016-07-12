/* eslint-disable no-console */
import mongoose from "mongoose";
import colors from "colors";

const databaseName = "BookService";
mongoose.connect(`mongodb://localhost/${databaseName}`, () => {
    console.log(`Database connection opened to ${databaseName}`.green);
});

export default mongoose;