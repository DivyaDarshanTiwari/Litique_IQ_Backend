"use strict";

const axios = require("axios");

const postCase = async (req, res) => {
  try {
    const {
      lawyerId,
      caseId,
      caseTitle,
      caseDesc,
      dateOfFile,
      courtName,
      judgeAssigned,
      Section_or_Act,
      status,
      evidenceObjectId,
      bookmark,
      partyId,
      partyName,
      partyType,
      partyRole,
      contact,
      address,
      hearingId,
      hearingOutcome,
      notesOfHearing,
      evidenceFileType,
      evidenceFileName,
      evidenceFileData,
      evidenceDesc,
    } = req.body;

    if (!lawyerId || !caseId || !caseTitle || !partyId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const postData = async (url, data) => {
      try {
        return await axios.post(url, data);
      } catch (error) {
        console.error(`Error posting to ${url}:`, error.message);
        return null;
      }
    };

    const CaseTable = await postData("/caseTable", {
      caseId,
      caseTitle,
      caseDesc,
      dateOfFile,
      courtName,
      judgeAssigned,
      Section_or_Act,
      status,
      evidenceObjectId,
      bookmark,
    });

    const PartyTable = await postData("/partyTable", {
      caseId,
      partyId,
      partyName,
      partyType,
      partyRole,
      contact,
      address,
    });

    const LawyerTable = await postData("/lawyerTable", {
      lawyerId,
      caseId,
    });

    const HearingTable = await postData("/hearingTable", {
      hearingId,
      caseId,
      hearingOutcome,
      notesOfHearing,
    });

    const EvidenceTable = await postData("/evidenceTable", {
      evidenceFileType,
      evidenceFileName,
      evidenceFileData,
      evidenceDesc,
    });

    if (
      CaseTable &&
      PartyTable &&
      LawyerTable &&
      HearingTable &&
      EvidenceTable
    ) {
      return res
        .status(201)
        .json({ message: "Case entry successfully created" });
    } else {
      return res.status(500).json({
        error:
          "Partial failure in creating case entry. Check logs for details.",
      });
    }
  } catch (error) {
    console.error("An error occurred during the Case entry:", error.message);
    return res.status(500).json({ error: "An internal server error occurred" });
  }
};

module.exports = { postCase };
