const express = require("express");
const cors = require("cors");
const rootDir = require("path").resolve("./");
const SaveEvents = require("./data/client");
const ValidateFields = require("./tools/validate");
const TextToJson = require("./tools/convert");

const TrackerService = express();
TrackerService.use(cors());

TrackerService.get("/", (req, res) => {
  res.sendFile(rootDir + "/src/front/index.js");
});

TrackerService.use(express.text());
TrackerService.use("/track", TextToJson);
TrackerService.use("/track", ValidateFields);
TrackerService.post("/track", async (req, res) => {
  res.status(200).end();
  console.log(req.body);
  await SaveEvents(req.body);
});
module.exports = TrackerService;
