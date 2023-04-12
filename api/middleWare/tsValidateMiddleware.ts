import { validateToken } from "../config/tsToken";
import { Request, Response, NextFunction } from 'express';
import { CompleteUserInterface } from "../models/tsUser"

export interface RequestInterface extends Request {
    user?: CompleteUserInterface
}


export const isAdmin = async(req: RequestInterface, res: Response, next: NextFunction ) => {
    const { token } : {token?: string | string[]} = req.query;
    try{
        if(typeof token === "string"){
            const decodeUser = await validateToken(token);
            if(decodeUser.payload?.user.admin){
                const userTOSend = decodeUser.payload?.user
                 req.user = userTOSend;
                return next();
            }
        }
        return res.status(401).send({ message: "User unathorized" });
    }catch(err){
        return res.status(401).json({message: "User unathorized"}); 
    }
}

export const isOperator = async(req: RequestInterface, res: Response, next: NextFunction ) => {
    const { token } : {token?: string | string[]} = req.query;
    try{
        if(typeof token === "string"){
            const decodeUser = await validateToken(token);
            if(decodeUser.payload?.user.operator){
                const userTOSend = decodeUser.payload?.user
                 req.user = userTOSend;
                return next();
            }
        }
        return res.status(401).send({ message: "User unathorized" });
    }catch(err){
        return res.status(401).json({message: "User unathorized"});
    }
}