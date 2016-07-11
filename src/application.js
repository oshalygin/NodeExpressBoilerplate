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


application.get("/", (request, response) => {
    response.send("Derp!")
});

application.listen(port, (error) => {
    if (!!error) {
        console.log(error.bold.red);
    }
    open(`http://localhost:${port}`);
});