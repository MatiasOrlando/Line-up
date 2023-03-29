const User = require("../models/user");
const Branch = require("../models/branch");
const router = require("express").Router();
const validateMiddleware = require("../config/validateMiddleware").isAdmin;
const adminController = require("../controllers/admin_controller")

// admin id 
router.post("/:id", validateMiddleware, async (req, res, next) => {
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
    createdBranch.save();
    return res.status(201).send(createdBranch);
  } catch (err) {
    console.log(err);
  }
});

// admin id , branch id , req.body = new Operator COMPLETO
router.put("/:id/editOperator/:branchId", validateMiddleware, async (req, res, next) => {
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
});

router.put("/:id/editBranchInfo/:branchId", validateMiddleware, async (req, res, next) => {
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
});

router.delete("/:id/deleteBranch/:branchId", validateMiddleware , async (req, res, next) => {
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
});

router.delete("/:id/deleteUser/:userId", validateMiddleware, async (req, res) => {
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
});

router.get("/:id/user", validateMiddleware, async (req, res) => {
  const allUsers = await User.find()
  if(!allUsers){
    return res.status(400).send({message: "users dont exist"})
  }else{
    return res.status(200).send(allUsers)
  }
});

router.get("/:id/branch", validateMiddleware, async (req, res) => {
  const allBranches = await Branch.find()
  if(!allBranches){
    return res.status(400).send({message: "branches dont exist"})
  }else{
    return res.status(200).send(allBranches)
  }
});
 

module.exports = router;
