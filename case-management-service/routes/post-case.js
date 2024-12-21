"use strict";
const express = require("express");
const axios = require("axios");
const { postCase } = require("../controllers/post-case-controller");
const router = express.Router();

const port = 3030;

router.use(express.json());

router.post("/new/case", postCase);

module.exports = router;
