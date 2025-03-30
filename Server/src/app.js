const express = require("express");
const app = express();
const aiRoutes = require("./routes/ai.routes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/ai", aiRoutes);
module.exports = app;
