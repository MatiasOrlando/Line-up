import express, { Response, Request } from "express";
import administrator_services from "../services/administrator_services"
import { RequestInterface } from "../middleWare/tsValidateMiddleware";


interface Usuario {
    _id: string;
    name: string;
    email: string;
    password: string,
    operator: boolean,
    admin: boolean,
    phone: number,
    dni: number,
 }

 interface Branch {
    name: string;
    email: string;
    openingHour: string;
    closingHour: string;
    allowedClients: number;
    /* userId: string, */
 }

 interface NewBranch {
    name: string;
    location: string;
    openingHour: string;
    closingHour: string;
    allowedClients: number;
 }

 interface allBranchResponse{
    error: boolean;
    data: Array<Branch>;
    message: string;
    length: number;
}


interface allUsersResponse{
    error: boolean,
    data: Array<Usuario>,
    message: string
    length: number;
}

interface DocumentResponse{
    error: boolean,
    message: string,
}

interface editBranchInfo{
    closingHour: string,
    openingHour: string,
    allowedClients: number
}


export const createOperator = async(req: RequestInterface, res: Response) => {
    const newUser : Usuario = req.body;
    const location : string = req.body.location;
    try{
        const result : DocumentResponse = await administrator_services.createOperator(newUser, location);
        if(!result.error){
            return res.status(200).json(result.message);
        }
        return res.status(400).json(result.message);
    }catch(err){
        return res.status(400).json({message: "Failed to create a new operator"})
    }
}

export const createBranchAndOPerator = async(req: RequestInterface, res: Response) => {
    const newUser : Usuario = req.body.user;
    const newBranch : NewBranch = req.body;
    try{
    const result : DocumentResponse = await administrator_services.createOperatorAndBranch(newBranch, newUser);
    if(!result.error){
        return res.status(200).json(result.message);
    }
     return res.status(400).json(result.message);
    }catch(err){
        return res.status(400).json({message: "Failed to create both branch and operator"});
    }
}


export const createBranch = async(req: RequestInterface, res: Response) => {
    const newBranch : NewBranch = req.body;
    try{
      const resultBranch : DocumentResponse = await administrator_services.createBranch(newBranch);
      if(!resultBranch.error){
        return res.status(200).json(resultBranch.message);
      }  
      return res.status(400).json(resultBranch.message)
    }catch(err){
        return res.status(400).json({message: "Failed to create a new branch"});
    }
}



export const editOperatorBranch = async (req: RequestInterface, res: Response) => {
    const branchId : string = req.params.branchId;
    const NewOperator : Usuario = req.body;
    try{
        const updateOperator : DocumentResponse = await administrator_services.editOperator(branchId, NewOperator);
        if(!updateOperator.error){
            return res.status(200).json(updateOperator.message);
        }
        return res.status(400).json(updateOperator.message);
    }catch(err){
        return res.status(400).json({message: "Failed to edit the operator from the selected branch"});
    }
}


export const editBranchInfo = async (req: RequestInterface, res: Response) => {
    const branchId : string = req.params.branchId;
    const infoToEdit : editBranchInfo = req.body
    try{
        const editedBrach : DocumentResponse = await administrator_services.editInfoBrach(branchId, infoToEdit);
        if(!editedBrach.error){
            return res.status(200).json(editedBrach.message);
        }
        return res.status(400).json(editedBrach.message);
    }catch(err){
        return res.status(400).json({message: "Failed to edit the info from the selected branch"});
    }
}



export const deleteBranch = async (req: RequestInterface, res: Response) => {
    const branchId : string = req.params.branchId;
    try{
        const erasedBranch : DocumentResponse = await administrator_services.deleteBranch(branchId);
        if(!erasedBranch.error){
            return res.status(200).json(erasedBranch.message);
        }
        return res.status(400).json(erasedBranch.message);
    }catch(err){
        return res.status(400).json({message: "Failed to delete the selected Branch from the database"});
    }
}




export const deleteUser = async (req: RequestInterface, res: Response) => {
    const userId : string = req.params.userId;
    try{
        const erasedUser : DocumentResponse = await administrator_services.deleteUser(userId);
        if(!erasedUser.error){
            return res.status(200).json(erasedUser.message);
        }
        return res.status(400).json(erasedUser.message);
    }catch(err){
        return res.status(400).json({message: "Failed to delete the selected User from the database"});
    }
}



export const getAllUsers = async (req: RequestInterface, res: Response) => {
    const number : number =  Number(req.params.number);
    const limit: number = number * 7;
    try{
        const allUsers : allUsersResponse = await administrator_services.allUsers(limit);
        if(!allUsers.error){
            return res.status(200).json({data: allUsers.data, length: allUsers.length})
        }
        return res.status(400).json(allUsers.message)

   }catch(err){
    return res.status(400).json({message: "Failed to get all the users from the database"});
   }
}

export const getAllOperatores = async(req: RequestInterface, res: Response) => {
    const number : number = Number(req.params.number);
    const limit : number = number * 7;
    try{
        const allOperator : allUsersResponse = await administrator_services.allOperators(limit);
        if(!allOperator.error){
            return res.status(200).json({data: allOperator.data, length: allOperator.length});
        }
        return res.status(400).json(allOperator.message);
    }
    catch(err){
        return res.status(400).json({message: "Failed to get all the operators from the database"});
    }
}

export const getAllBraches = async(req: RequestInterface, res: Response) => {
const number : number = Number(req.params.number);
const limit : number = number * 7;
try{
    const allBranches : allBranchResponse = await administrator_services.allBranches(limit);
    if(!allBranches.error){
        return res.status(200).send({data: allBranches.data, length: allBranches.length});
    }
    return res.status(400).json({message: allBranches.message});

}catch(err){
    return res.status(400).json({message: "Failed to get all the branches from the database"});
}
}