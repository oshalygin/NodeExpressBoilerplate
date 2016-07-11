/* eslint-disable no-console */
import express from "express";
import mongoose from "mongoose";
import webpack from "webpack";
import configuration from "../webpack.config.dev";
import colors from "colors";
import open from "open";

// import bookController from "./controllers/bookController";

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/book');

let application = express();


let port = process.env.PORT || 3000;
var bookRouter = express.Router();

const applicationCompiler = webpack(configuration);

application.use(require("webpack-dev-middleware")(applicationCompiler, {
    noInfo: true,
    publicPath: configuration.output.publicPath
}));
application.use(require("webpack-hot-middleware")(applicationCompiler));


bookRouter.route('/Books')
    .get(function(req,res){

        var query = {};

        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }
        Book.find(query, function(err,books){
            if(err)
                res.status(500).send(err);
            else
                res.json(books);
        });
    });

application.get("/", (request, response) => {
    response.send("Api welcome page");
});

application.use('/api', bookRouter);

application.listen(port, (error) => {
    if (!!error) {
        console.log(error.bold.red);
    }
    open(`http://localhost:${port}`);
});