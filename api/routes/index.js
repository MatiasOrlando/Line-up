const express = require("express");
const routerIndex = express.Router();
const userRoutes = require("./userRoutes");
const appointmentsRoutes = require("./appointmentsRoutes");
const admim = require("./adminRoutes")
const operator = require("./operatorRoutes")

routerIndex.use("/user", userRoutes);
routerIndex.use("/appointments", appointmentsRoutes);
routerIndex.use("/admin", admim)
routerIndex.use("/operator", operator)


module.exports = routerIndex;
