const { userSchema, Usuario } = require("../models/tsUser")
import { passwordUpdate } from "../config/tsEmailConfirmation"
import { validateToken, generateToken } from "../config/tsToken"



interface bodyUser {
    name: string;
    email: string;
    password: string;
    phone: number;
    dni: number;
}

interface logIn {
    password: string;
    email: string;
}

interface newPassBody {
    password: string;
    token: string;
}

interface responseGenerateToken {
    message: string;
    token: string | null;
}



interface user {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: number;
    dni: number;
    admin: boolean;
    operator: boolean;
}

interface logInData {
    _id: string;
    name: string;
    email: string;
    phone: number;
    dni: number;
    admin: boolean;
    operator: boolean;
}


  
  
interface userToken {
    admin: boolean;
    operator: boolean;
    dni: number;
    name: string;
    email: string;
    password: string;
    phone: number;
    _id: string;
}




export default class user_services {

    static async createUser(newUser: bodyUser ): Promise<{ error: boolean, message: string}>{
        try{
            const registerUser : user = await Usuario.create(newUser);
            return{error: false, message: "Succesfully create user in the database"};
        }catch(err: unknown){
            if(err instanceof Error){
                return {error: true, message: err.message};
            }
            return{error: true, message: "Unknown Error, failed to create user in the register"};
        }
    }

    static async getAllUsers(): Promise<{ error: boolean, message: string, data: Array<user>}> {
       try{
        const arrayOfUsers : Array<user> = await Usuario.find();
        return {error: false, message: "Succesfully found all users", data: arrayOfUsers};
       }catch(err: unknown){
        if(err instanceof Error){
            return{error: true, message: err.message, data: []};
        }
        return{error: true, message: "Unknown Error, failed to get all the users", data: []};
       } 
    }

    static async userLogIn(logInUser: logIn): Promise<{ error: boolean, message: string, data: user | null}>{
        try{
            const foundUser = await Usuario.findOne({"email": logInUser.email});
            console.log(foundUser)
        const logged = await foundUser.validatePassword(logInUser.password);
             if(!logged){
                return{error: true, message: "No authorization, Invalid credentials", data: null};
            }  
            console.log(foundUser);
/*            const response : responseGenerateToken = await generateToken(foundUser); */
            return{error: false, message: "Succesfully log in user", data: foundUser};
        }catch(err: unknown){
            if(err instanceof Error){
                return {error: true, message: err.message, data: null}
            }
            return{error: true, message: "Unknown Error, failed to log in user", data: null}
        }
    }

    static async getSingleUser(id: string): Promise<{ error: boolean, message: string, data: logInData | null}>{
        try{
            const singleUser : logInData = await Usuario.findById(id);
            return{error: false, data: singleUser, message: "Succesfully found user by id"};

        }catch(err: unknown){
            if(err instanceof Error){
                return {error: true, message: err.message, data: null};
            }
            return{error: true, message: "Unknown Error, failed to found user by id", data: null};
        }
    }

    static async newPassword(body: newPassBody): Promise<{ error: boolean, message: string}>{
        try{
            const userResponse  = await validateToken(body.token);
            if(userResponse.payload && body.password){
                 const updateUser : user = await Usuario.findByIdAndUpdate(userResponse.payload?.user._id, {"password": body.password}, {new: true});
                return{error: false, message: "Succesfully updated user password"}; 
            }
             return{error: true, message: "Unothorized to change user password"}; 
        }catch(err: unknown){
            if(err instanceof Error){
                return{error: true, message: err.message };
            }
            return{error: true, message: "Unknown Error, failed to get a single User"};
        }
    }


    static async passwordEmailUpdate(email: string): Promise<{ error: boolean, message: string}>{
        try{
    const userToUpdate : user = await Usuario.find({"email": email});
    const response : responseGenerateToken = await generateToken(userToUpdate);
    console.log(response);
    if(response.token){
        await passwordUpdate(email, response.token); 
        return{error: false, message: "Successfully update the user password"}
    }
    return{error: true, message: "Failed token generation"};
        }catch(err: unknown){
            if(err instanceof Error){
                return{error: true, message: err.message};
            }
            return{error: true, message: "Unknown Error, failed to update password"};
        }
    }

    static async validateUserData(token: string): Promise<{error: boolean, message: string, data: userToken | null}>{
        try{
          const response = await validateToken(token);
          console.log(response.payload?.user);
          if(response.payload){
            return{error: false, message: "Successfully validate user", data: response.payload.user }
          }
         return{error: true, message: "Failed to validate Token", data: null }
        }catch(err: unknown){
            if(err instanceof Error){
                return{error: true, message: err.message, data: null};
            }
            return{error: true, message: "Unknown Error, failed to validate User", data: null};
        }
    }
}