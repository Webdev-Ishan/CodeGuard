const express = require('express');
const Router = express.Router();
const aiController = require("../Controllers/ai.controller.js");

Router.post("/get-response", aiController.getResponse);

module.exports = Router;
