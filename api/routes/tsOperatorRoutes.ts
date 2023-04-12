import { Router, Request, Response } from 'express';
import express from "express";
import { allAppointments, editStatusOfAppointment } from '../controllers/tsOperator_Controller';
import { isOperator } from '../middleWare/tsValidateMiddleware';

const router: Router = express.Router();

router.get("/appointment/:numberOfPages/token",isOperator , allAppointments);


router.put("/appointment/:appointmentId/token", isOperator, editStatusOfAppointment);

export default router;