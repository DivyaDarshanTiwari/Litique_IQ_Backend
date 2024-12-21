"use strict";

const axios = require("axios");

const getList = async (req, res) => {
  try {
    const { LawyerID } = req.query;

    if (!LawyerID) {
      return res.status(400).json({ error: "LawyerID is required" });
    }

    const response = await axios.get("https://example.com/cases", {
      params: {
        LawyerID: LawyerID,
      },
    });

    if (response.data) {
      return res.status(200).json({ msg: response.data });
    } else {
      return res
        .status(404)
        .json({ error: "No cases found for the provided LawyerID" });
    }
  } catch (error) {
    console.error("An error occurred in the getList endpoint:", error.message);
    return res.status(500).json({ error: "An internal server error occurred" });
  }
};

module.exports = { getList };
