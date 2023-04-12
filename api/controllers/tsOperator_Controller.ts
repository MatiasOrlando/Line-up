import express, { Response, Request } from "express";
import operator_services from "../services/tsOperator_services";
import { RequestInterface } from "../middleWare/tsValidateMiddleware";

interface appointment{
    date: Date;
    timeOfAppointment: string;
    status: string;
    sucursal: string;
    user: string;
    id: string;
}

interface allAppointments{
    error: boolean,
    data: Array<appointment>,
    message: string,
    length: number
}

interface DocumentResponse{
    error: boolean,
    message: string,
}

export const allAppointments = async(req: RequestInterface, res: Response) => {
    const number : number = Number(req.params.numberOfPages);
    const limit = number * 7;
    try{
        if(req.user?.email) {const email = req.user?.email;
        const response : allAppointments = await operator_services.allAppointments(limit, email);
        if(!response.error){
            return res.status(200).json({data: response.data, length: response.length});
        }
        return res.status(400).json(response.message);}
    }catch(err){
        return res.status(400).json({message: "Failed to get all appointments of operator branch"});
    }
}


export const editStatusOfAppointment = async (req: RequestInterface, res: Response) => {
    const status : string = req.body.status;
    const appointmentId : string = req.params.appointmentId;
    try{
        if(status !== "pending" && status !== "completed"){
            return res.status(400).json({message: "Invalid data types"});
        }
        if(req.user?._id && appointmentId){
            const id = req.user._id
            const result : DocumentResponse = await operator_services.editStatusOfAppointment(status, appointmentId, id);
            if(!result.error){
                return res.status(200).json(result.message);
            }
            return res.status(400).json(result.message);
        }
        return res.status(400).json({message: "Operator id does not exist"});
    }catch(err){
        return res.status(400).json({message: "Failed to edit status of appointment"});
    }
}