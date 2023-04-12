 import jwt, { JwtPayload } from "jsonwebtoken";
 const SECRET : string = "Matias";

 interface Payload extends JwtPayload {
   user: user
  }
  

  
interface user {
    admin: boolean;
    operator: boolean;
    dni: number;
    name: string;
    email: string;
    password: string;
    phone: number;
    _id: string;
}

export const generateToken = async(payload: user): Promise <{token: string | null, message: string}> => {
    try{
        const token : string = jwt.sign({user: payload}, SECRET, { expiresIn: "2d"});
        return{ token, message: "Successfully generate token" };
    }catch(err: unknown){
       if(err instanceof Error){
        return{token: null, message: err.message}
       }
       return{token: null, message: "Unknown Error, failed to generete token"};
    }
  
}

export const validateToken = async(token: string): Promise <{payload: Payload | null, token: string, message: string}> => {
    try{
    const payload = jwt.verify(token, SECRET) as Payload;
    return { payload, token, message: "Successfully validate Token"};
}catch(err: unknown){
        if(err instanceof Error){
         return{token, payload: null, message: err.message}
        }
        return{token, message: "Unknown Error, failed to generete token", payload: null};
     }
}