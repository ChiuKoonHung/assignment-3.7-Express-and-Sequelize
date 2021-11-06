const express = require("express");
const app = express();
app.use(express.json()); // Enable express to parse JSON as request body.
const protectedRoutes = require("./protected.routes");
const generalRoutes = require("./general.routes");

app.use(protectedRoutes);
// app.use("/protected", protectedRoutes); // in the protected.routes can just put / instead of /protected.
app.use(generalRoutes);

module.exports = app;