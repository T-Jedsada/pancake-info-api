const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

import express, { Request, Response } from "express";
import tokens from "./api/tokens/tokens";

// const pancakeswap = require("./exchanges/pancakeswap");

// TODO: uncomment when you want to use Mongo
// require('./database/index')();

const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/price/:input", async (req: Request, res: Response) => {
  //   pancakeswap.getPrice(req, res);
});

app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});

(async () => {
  const token = await tokens("0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82");
  console.log("token: ", token);
})();
