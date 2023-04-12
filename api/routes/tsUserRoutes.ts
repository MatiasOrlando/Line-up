import { Router, Request, Response } from 'express';
import express from "express";
import { registerUser, getAllUsers, logIn, getSingleUser,  newPassword, passwordEmailUpdate, validateToken } from '../controllers/tsUser_Controller';
import { emailConfirmation } from '../config/tsEmailConfirmation';

const router :  Router = express.Router();

router.post("/register", registerUser);

router.post("/login", logIn);

router.post("/all-users", getAllUsers);

 router.get("/:id", getSingleUser); 

router.put("/new-password", newPassword);

router.put("/password-update-email", passwordEmailUpdate);

router.get("/validate/token", validateToken);

router.post("/appointmentBooked", async (req: Request, res: Response) => {
    const email : string = req.body.email;
    try{
        await emailConfirmation(email);
        return res.status(200).json({message: "Successfully booked appointement"});
    }catch(err){
        return res.status(400).json({message: "Failed to book an appointment"});
    }
  });

export default router;