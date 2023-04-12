const { TurnosModelo } = require("../models/tsAppointment");
import { AppoinmentInterface } from "../models/tsAppointment"
import { branchInterface, Branch } from "../models/tsBranch";

interface response{
    date: Date;
    timeOfAppointment: string;
    status: string;
    sucursal: string;
    user: string;
    id: string;
}

interface appointment{
    date: Date;
    timeOfAppointment: string;
    status: string;
    cancelReason: null | string;
    createdAt: Date;
    sucursal: BranchShema;
    user: UsuarioSchema;
    id: string;
}

interface BranchShema {
    id: string;
    location: string;
    openingHour: string;
    closingHour: string;
    allowedClients: number;
 }

interface UsuarioSchema {
    id: string;
    name: string;
    email: string;
    phone: number,
 }

export default class operator_services {

    static async allAppointments(limit: number, email: string): Promise<{ error: boolean, data: Array<response>, message: string, length: number}>{
        try{
           const appointments : Array<appointment> = await TurnosModelo.find({ "user.email": email});
           console.log(appointments)
           const array = appointments.map(function (item: appointment) { return { date: item.date, timeOfAppointment: item.timeOfAppointment, status: item.status, sucursal: item.sucursal.location, user: item.user.name, id: item.id  }});
           const page = array.splice(limit - 7, limit);
           return {error: false, data: page, message: "Succesfully found all appointments", length: appointments.length};

        }catch(err: unknown){
            if(err instanceof Error){
                return{error: true, data: [], message: err.message, length: 0}
            }
            return{error: true, data: [], message: "Unknown Error, failed to get all appointments", length: 0}
        }
    }


    static async editStatusOfAppointment(status: string, appointmentId: string, id: string): Promise<{ error: boolean, message: string}>{
        try{
            const updateState : AppoinmentInterface = await TurnosModelo.findOneAndUpdate({_id: appointmentId}, {$set: {status: status}}, {new: true});
            return{error: false, message: "Succesfully update status of appoinment"};
        }catch(err: unknown){
            if(err instanceof Error){
                return {error: true, message: err.message};
            }
            return{error: true, message: "Unknown Error, failed to edit status of appoinment"};
        }
    }
}