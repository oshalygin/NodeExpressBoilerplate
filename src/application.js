/* eslint-disable no-console */
import express from "express";
import webpack from "webpack";
import configuration from "../webpack.config.dev";
import colors from "colors";
import open from "open";


let application = express();


let port = process.env.PORT || 3000;
const applicationCompiler = webpack(configuration);

application.use(require("webpack-dev-middleware")(applicationCompiler, {
    noInfo: true,
    publicPath: configuration.output.publicPath
}));
application.use(require("webpack-hot-middleware")(applicationCompiler));

let booksRouter = express.Router();
booksRouter.route("/books")
    .get((request, response) => {
        let book = {
            id: "1",
            title: "Clean Codezz",
            description: "Some book about clean code and such",
            pageLength: 1349
        };
        response.json(book);
    });

application.use("/api", booksRouter);

application.get("/", (request, response) => {
    response.send("Api welcome page");
});

application.listen(port, (error) => {
    if (!!error) {
        console.log(error.bold.red);
    }
    open(`http://localhost:${port}`);
});