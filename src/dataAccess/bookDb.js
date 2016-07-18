/* eslint-disable no-console */
import mongoose from "mongoose";
import colors from "colors";

const databaseName = "BookService";
const testDatabaseName = "BookService_Test"

if (process.env.NODE_ENV === 'test') {
    mongoose.connect(`mongodb://localhost/${testDatabaseName}`, () => {
        console.log(`Database connection opened to TESTING db: ${testDatabaseName}`.blue);
    });
}
else {
    mongoose.connect(`mongodb://localhost/${databaseName}`, () => {
        console.log(`Database connection opened to TESTING db: ${databaseName}`.green);
    });
}

export default mongoose;