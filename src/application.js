/* eslint-disable no-console */
import express from "express";
import mongoose from "mongoose";
import webpack from "webpack";
import configuration from "../webpack.config.dev";
import colors from "colors";
import open from "open";

import bookController from "./controllers/bookController";

let application = express();
let port = process.env.PORT || 3000;

const applicationCompiler = webpack(configuration);
application.use(require("webpack-dev-middleware")(applicationCompiler, {
    noInfo: true,
    publicPath: configuration.output.publicPath
}));
application.use(require("webpack-hot-middleware")(applicationCompiler));

application.get("/", (request, response) => {
    response.send("Api welcome page");
});

application.use('/api', bookController);

application.listen(port, (error) => {
    if (!!error) {
        console.log(error.bold.red);
    }
    open(`http://localhost:${port}`);
    console.log(`connection opened on http://localhost:${port}`.green);
});