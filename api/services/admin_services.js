const User = require("../models/user");
const Branch = require("../models/branch");




const create_operator = async ( operatorInfo, location ) => {
    try {
   if (typeof (operatorInfo.phone) !== "number" || typeof (operatorInfo.email) !== "string" || (operatorInfo.operator) !== true || typeof (operatorInfo.name) !== "string" || typeof (operatorInfo.password) !== "string" || typeof (operatorInfo.dni) !== "number" || typeof (location) !== "string" ) {
            return({status: 400})
        }  

const newOperator = await User.create(operatorInfo);
    if(!newOperator){
        return({status: 500}) 
    }
const user = { id: newOperator.id, email: newOperator.email, phone: newOperator.phone, operator: newOperator.operator }
const updatedBranch = await Branch.findOneAndUpdate({location: location}, { $set: { user: user}}, { new: true})
   if(!updatedBranch){
        return({status: 400}) 
    }else{
        updatedBranch.save()
        console.log(updatedBranch)
        return({status: 201}) 
    }    
} 
    catch (err) {
        console.log(err)
    }
}

const createOperatorBranch = async (branchInfo, userInfo) => {
    try {

        if (typeof (userInfo.phone) !== "number" || typeof (userInfo.email) !== "string" || typeof (userInfo.operator) !== "boolean" || typeof (userInfo.name) !== "string" || typeof (userInfo.password) !== "string") {
            return res.status(400).send({ message: "invalid type of body" })
        }


        const operador = await User.create(userInfo);
        const { id, email, phone, operator } = operador;

        const createdBranch = await Branch.create({
            name: branchInfo.name, location: branchInfo.location, hourRange: branchInfo.hourRange, allowedClients: branchInfo.allowedClients,
            user: { id, email, phone, operator },
        });
        return (createdBranch);
    } catch (err) {
        return({message: "failed to pass neccesary information"})
    }
}


/* const createBranch = async ( body ) => {
    try {
        console.log(body)
     if (typeof(body.name) !== "string" || typeof (body.location) !== "string" || typeof (body.hourRange) !== "string" || typeof (body.allowedClients) !== "number") {
         console.log("entre en el if type")   
        return({ status: 400 })
        }else {
            const createdBranch = await Branch.create({
                name: body.name, location: body.location, hourRange: body.hourRange, allowedClients: body.allowedClients
            });
            console.log("NEW BRANCH",createdBranch)
            if(!createdBranch){
                return({status: 400})
            }
            return({status: 201})
        }

  } catch (err) {
        return({status: 404})
    }
} */

const createBranch = async (body) => {
    const newBranch = await Branch.create(body);
    return newBranch
}




module.exports = { createBranch, create_operator, createOperatorBranch }