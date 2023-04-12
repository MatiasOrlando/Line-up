import { Document, Schema, Model, model } from "mongoose";

interface UserAppoinment {
        _id: string; 
        name: string;
        email: string;
        phone: number;
}

interface BranchAppoinment {
  _id: string;
  location: string;
  allowedClients: number;
  closingHour: string;
  openingHour: string;
}

export interface AppoinmentInterface {
  _id: string;
  date: string;
  timeOfAppointment: string;
  status: string;
  cancelReason: string;
  createdAt: Date;
  user: UserAppoinment;
  sucursal: BranchAppoinment;
}


interface User extends Document {
        _id: string; 
        name: string;
        email: string;
        phone: number;
    };

interface Sucursal extends Document {
    _id: string;
    location: string;
    allowedClients: number;
    closingHour: string;
    openingHour: string;
};

interface Appointment extends Document {
    _id: string;
    date: string;
    timeOfAppointment: string;
    status: string;
    cancelReason: string;
    createdAt: Date;
    user: User;
    sucursal: Sucursal;
};

const AppointmentSchema : Schema = new Schema({
    date: { type: String, required: true },
    timeOfAppointment: { type: String, required: true },
  status: { type: String, required: true, default: "pending" },
  cancelReason: { type: String, default: null },
  createdAt: { type: Date, default: Date.now() },
  user: {
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, min: [9, "too few numbers"],  maxLength: [15, "too many numbers"], required: true,},
  },
  sucursal: {
    _id: { type: Schema.Types.ObjectId, required: true },
    location: { type: String, required: true },
    allowedClients: { type: Number, required: true },
    closingHour: { type: String, required: true },
    openingHour: { type: String, required: true },
  },
});

const TurnosModelo : Model <Appointment> = model<Appointment>("Appointment", AppointmentSchema);

export { AppointmentSchema, TurnosModelo };