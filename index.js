const StaticFilesService = require("./src/server/static");
const TrackerService = require("./src/server/tracker");
StaticFilesService.listen(8000);
TrackerService.listen(8001);
console.log("Started");
