const express = require('express');
const path = require('path');
 
const StaticFilesService = express();
StaticFilesService.use('/', express.static('public'));
module.exports = StaticFilesService;