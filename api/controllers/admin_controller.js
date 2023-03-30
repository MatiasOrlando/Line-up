const User = require("../models/user");
const Branch = require("../models/branch");
const validateMiddleware = require("../config/validateMiddleware").isAdmin;



exports.create_branch_post = async (req, res, next) => {
    try {
        const { name, location, hourRange, allowedClients } = req.body;
        if (
          !req.body.user.email ||
          !req.body.user.phone ||
          !req.body.user.operator ||
          !req.body.user.name ||
          !req.body.user.password ||
          !name ||
          !location ||
          !hourRange ||
          !allowedClients
        ) {
          return res.status(400).send({ message: "Missing key data" });
        }
        const operador = await User.create(req.body.user);
        const { id, email, phone, operator } = operador;
    
        const createdBranch = await Branch.create({
          name,
          location,
          hourRange,
          allowedClients,
          user: { id, email, phone, operator },
        });
        return res.status(201).send(createdBranch);
      } catch (err) {
        console.log(err);
      }
}


exports.edit_operator_put = async (req, res, next) => {
    const branchId = req.params.branchId
    try {
      console.log("REQ BODY", req.body)
      if (
        !req.body.email ||
        !req.body.phone ||
        !req.body.operator ||
        !req.body.name ||
        !req.body.password ||
        !branchId) {
        return res.status(400).send({ message: "Missing key data" });
      }
const body = {email: req.body.email, phone: req.body.phone, operador: req.body.operador, }

      const operador = await User.create(req.body);
      console.log("OPERATOR", operador)
      const { id, email, phone, operator } = operador;
      const user = {id, email, phone, operator}
  
  
      if (
        !id ||
        !email ||
        !phone ||
        !operator) {
        return res.status(400).send({ message: "Missing key data" });
      }  
  
    
      const updatedBranch = await Branch.findOneAndUpdate({_id: branchId}, {$set: { user: user }}, {new: true})
      const savedBranch = await updatedBranch.save()
      return res.status(200).send(savedBranch)
      
    } catch (err) {
      console.log(err);
    }
}


exports.edit_branch_info = async(req, res, next) => {
    const branchId = req.params.branchId
    const {hourRange, allowedClients} = req.body
    try {
      console.log("REQ BODY", req.body)
      if (
        !hourRange ||
        !allowedClients ||
        !branchId) {
        return res.status(400).send({ message: "Missing key data" });
      }
    
      const updatedBranch = await Branch.findOneAndUpdate({_id: branchId}, {$set: { allowedClients: allowedClients, hourRange: hourRange }}, {new: true})
      const savedBranch = await updatedBranch.save()
      return res.status(200).send(savedBranch)
      
    } catch (err) {
      console.log(err);
    }
}


exports.delete_branch_delete = async(req, res, next) => {
    const branchId = req.params.branchId
    try {
      if (!branchId) {
        return res.status(400).send({ message: "Invalid branchId value" });
      }
    
    const deletedBranch = await Branch.findByIdAndRemove(branchId)
        if(!deletedBranch){
          return res.status(404).send({message: "branch not found "})
        }else{
          return res.status(200).send({message: "Deleted succesfully"})
        }
    } catch (err) {
      console.log(err);
    }
}



exports.delete_user_delete = async(req, res, next) => {
    const userId = req.params.userId
    try {
      if (!userId) {
        return res.status(400).send({ message: "Invalid userId value" });
      }
    
    const deletedUser = await User.findByIdAndRemove(userId)
        if(!deletedUser){
          return res.status(404).send({message: "user not found "})
        }else{
          return res.status(200).send({message: "Deleted succesfully"})
        }
    } catch (err) {
      console.log(err);
    }
}


exports.get_all_users_get = async(req, res, next) => {
    const allUsers = await User.find()
    if(!allUsers){
      return res.status(400).send({message: "users dont exist"})
    }else{
      return res.status(200).send(allUsers)
    }
}


exports.get_all_branches_get = async(req, res, next) => {
    const allBranches = await Branch.find()
    if(!allBranches){
      return res.status(400).send({message: "branches dont exist"})
    }else{
      return res.status(200).send(allBranches)
    }
}