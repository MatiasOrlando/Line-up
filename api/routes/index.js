const express = require("express");
const { route } = require("./userRoutes");
const routerIndex = express.Router();
const userRoutes = require("./userRoutes");
const appointmentsRoutes = require("./appointmentsRoutes");

routerIndex.use("/user", userRoutes);
routerIndex.use("/appointments", appointmentsRoutes);

module.exports = routerIndex;
