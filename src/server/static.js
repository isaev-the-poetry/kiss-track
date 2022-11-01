const express = require("express"); 

const StaticFilesService = express();
StaticFilesService.use("/", express.static("public"));
module.exports = StaticFilesService;
