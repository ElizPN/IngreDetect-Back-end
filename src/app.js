const express = require("express");
const bodyParser = require("body-parser");
const {
  handleIngridientsRequest,
} = require("./controllers/ingridientsController");


const app = express();
app.use(bodyParser.json());

app.post("/data", handleIngridientsRequest);

module.exports = app;
