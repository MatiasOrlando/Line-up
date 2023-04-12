import { Document, Schema, Model, model } from "mongoose";
import * as bcrypt from 'bcrypt';



interface CompleteUserInterface {
    _id: string;
    name: string;
    email: string;
    password: string
    operator: boolean,
    admin: boolean,
    phone: number,
    dni: number
}

interface Usuario extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    salt: string;
    operator: boolean;
    admin: boolean;
    phone: number;
    dni: number;
}



const userSchema :  Schema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true,},
    phone: { type: Number, required: true},
    password: {type: String, required: true},
    salt: {type: String},
    admin: { type: Boolean, default: false},
    operator:{ type: Boolean, default: false}, 
    dni: {type: Number, require: true, unique: true}
    })

    userSchema.pre("save", async function(next){
        try{
            const user = this;
            const salt = bcrypt.genSaltSync(9);
            user.salt = salt;
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword
            next();
        }catch(err){
            console.log(err)
        }
    })

     userSchema.methods.validatePassword = async function(password: string){
        try{
            const hashedPasswordInput = await bcrypt.hash(password, this.salt);
            return hashedPasswordInput === this.password;
        }catch(err){
           console.log(err)
        }
    }


    const Usuario: Model <Usuario> = model<Usuario>("Usuario", userSchema)

    export  {userSchema,  Usuario, CompleteUserInterface};