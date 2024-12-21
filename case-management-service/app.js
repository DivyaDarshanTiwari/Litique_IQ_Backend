"use strict";
const express = require("express");
const app = express();
const morgan = require("morgan");
const getList_route = require("./routes/get-list");
const postCase_route = require("./routes/post-case");

app.use(express.json());
app.use(morgan("dev"));

app.use("/", getList_route);
app.use("/post", postCase_route);

module.exports = app;
