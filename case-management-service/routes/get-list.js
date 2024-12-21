"use strict";
const express = require("express");
const axios = require("axios");
const { getList } = require("../controllers/get-list-controller");
const router = express.Router();

router.use(express.json());

router.get("/", getList);

module.exports = router;
