import { Document, Schema, Model, model } from "mongoose";

interface userInterface{
    name: string;
    email: string;
    operator: boolean
    phone: number,
}

export interface branchInterface {
    _id: string;
    name: string;
    location: string;
    openingHour: string;
    closingHour: string;
    allowedClients: number;
    user: userInterface;
}

interface User extends Document {
/*     id: string; */
    name: string;
    email: string;
    operator: boolean
    phone: number,
}

interface Branch extends Document {
    _id: string;
    name: string;
    location: string;
    openingHour: string;
    closingHour: string;
    allowedClients: number;
    user: User;
}

const brachSchema : Schema = new Schema({
    name: {type: String, required: true},
    location: {type: String, required: true },
    openingHour: {type: String, required: true},
    closingHour: {type: String, required: true},
    allowedClients: {type: Number, required: true},
    user: {
    _id: {type: Schema.Types.ObjectId, default: null},
    name: { type: String, default: null},
    email: { type: String, default: null },
    phone: { type: Number, default: null},
    operator:{ type: Boolean, default: true}, }
})

const Branch: Model <Branch> = model<Branch>("Branch", brachSchema);

export { brachSchema, Branch};