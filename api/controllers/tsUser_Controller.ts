import express, { Response, Request } from "express";
import  user_services  from "../services/tsUser_Services"
import { error } from "console";

interface NewUser {
    name: string;
    email: string;
    password: string;
    phone: number;
    dni: number;
}

interface loginData {
    _id: string;
    name: string;
    email: string;
    phone: number;
    dni: number;
    admin: boolean;
    operator: boolean;
}

interface logIn {
    email: string;
    password: string;
}

interface newPassBody {
    token: string;
    password: string;
}

interface CompleteUser{
    name: string;
    email: string;
    password: string;
    phone: number;
    dni: number;
    operator: boolean;
    admin: boolean;
}

interface DocumentResponseSimple {
    error: boolean;
    message: string
}

interface DocumentResponseArrayData {
    error: boolean;
    message: string;
    data: Array<CompleteUser>
}

interface DocumentResponseData {
    error: boolean;
    message: string;
    data: loginData | null;
}


interface documentResponse {
    error: boolean;
    message: string;
    data: CompleteUser | null;
}


export const registerUser = async (req: Request, res: Response) => {
    const newUser : NewUser = req.body;
    try{
        const response : DocumentResponseSimple = await user_services.createUser(newUser);
     if(!response.error){
        return res.status(201).json(response.message)
     }
     return res.status(400).json(response.message);

    }catch(err){
        return res.status(400).json({error: "Failed to registe the user"});
    }
}


export const getAllUsers = async (req: Request, res: Response) => {
    try{
        const response : DocumentResponseArrayData = await user_services.getAllUsers();
        if(!response.error){
            return res.status(200).json(response.data);
        }
        return res.status(400).json(response.message);
    }catch(err){
        return res.status(500).json({message: "Failed to get all user"});
    }
}

export const logIn = async(req: Request, res: Response) => {
    const logInUser : logIn = req.body;
    try{
        const response : documentResponse = await user_services.userLogIn(logInUser);
        if(!response.error){
            return res.status(200).json(response.data);
        }
        return res.status(401).json(response.message);
    }catch(err){
        return res.status(500).json({message: "Failed to log in"});
    }
}

export const getSingleUser = async(req: Request, res: Response) => {
    const id : string = req.params.id;
    try{
        const response : DocumentResponseData = await user_services.getSingleUser(id);
        if(!response.error){
            return res.status(200).json(response.data);
        }
        return res.status(400).json(response.message);
    }catch(err){
        return res.status(500).json({message: "Failed to get a single user"});
    }
}


export const newPassword = async(req: Request, res: Response) => {
    const body : newPassBody = req.body;
    try{
        const newPass : DocumentResponseSimple = await user_services.newPassword(body);
        if(!newPass.error){
            return res.status(200).json(newPass.message);
        }
        return res.status(400).json(newPass.message);

    } catch(err){
        return res.status(500).json({message: "Server Error"});
    }
}


export const passwordEmailUpdate = async(req: Request, res: Response) => {
    const email : string = req.body.email;
    try{
        const response : DocumentResponseSimple = await user_services.passwordEmailUpdate(email);
        if(!response.error){
            return res.status(200).json(response.message);
        }
        return res.status(400).json(response.message);
    }catch(err){
        return res.status(500).json({message: "Currently unavailable to update password"});
    }

}

export const validateToken = async(req: Request, res: Response) => {
    const { token } : { token?: string | string[]} = req.query;
    try{
        if(typeof token === "string"){
            const response : DocumentResponseData = await user_services.validateUserData(token);
            if(!response.error){
                return res.status(200).json(response.data);
            }
            return res.status(400).json(response.message);
        }
        return res.status(400).json({message: "Invalid Token data type"});
    }catch(err){
        return res.status(500).json({message: "Internal server error"});
    }
}