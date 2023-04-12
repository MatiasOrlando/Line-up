import express from "express";
import { Router } from "express";
import administratorRoutes from "./administratorRoutes";
import operatorRoutes from "./tsOperatorRoutes"
import userRoutes from "./tsUserRoutes";


const routerIndex: Router = express.Router();
routerIndex.use("/admin", administratorRoutes);
routerIndex.use("/operator", operatorRoutes);
routerIndex.use("/user", userRoutes);


export default  routerIndex ;