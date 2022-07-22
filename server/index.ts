import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpack from "webpack";
import open from "open";
import historyApiFallback from "connect-history-api-fallback";
import config  from "../webpack.config";
import getPort from "./getPort";
import api from "./api";

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output?.publicPath,
}));
app.use(historyApiFallback());
app.use(express.static(config.output?.path || "dist"));

// set api router
app.use("/api", api);

async function setUp() {
  const PORT = await getPort(3000);
  app.listen(PORT, async function () {
    const url = `http://localhost:${PORT}`;
    await open(url);
    console.info('==> 🌎 Listening on port %s 🚀', PORT);
  });
}

setUp();