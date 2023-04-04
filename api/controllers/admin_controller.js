const User = require("../models/user");
const Branch = require("../models/branch");
const admin_services = require("../services/admin_services")



exports.create_operator_post = async (req, res, next) => {
  const operatorInfo = { name: req.body.name, email: req.body.email, phone: req.body.phone, operator: req.body.operator, password: req.body.password, dni: req.body.dni }
  const { location } = req.body
  try {
    const operatorResult = await admin_services.create_operator(operatorInfo, location)
    console.log("RESULTADO", operatorResult)
      if (operatorResult.status === 201) {
      return res.status(201).send({ message: "operator created and updated branch" })
    }
    if (operatorResult.status === 500) {
      return res.status(400).send({ message: "failed to create operator because dni or gmail already exist" })
    }
    if (operatorResult.status === 400) {
      return res.status(400).send({ message: "failed to updated branch" })
    }
    else {
      return res.status(404).send({ message: "unknown error" })
    }  
  } catch (err) {
    return res.status(400).send({ message: "missing key data || operator gmail and dni may already exist" })
  }
}

exports.createOperatorAndBranch = async (req, res, next) => {
  const branchInfo = { name: req.body.name, location: req.body.location, hourRange: req.body.hourRange, allowedClients: req.body.hourRange }
  const userInfo = { name: req.body.user.name, email: req.body.user.email, phone: req.body.user.phone, operator: req.body.user.operator, password: req.body.user.password, dni: req.body.user.dni }
  try {
    const branchResult = await admin_services.createOperatorBranch(branchInfo, userInfo)
    if (!branchResult.location) {
      return res.status(404).send({ message: "unknown error" })
    }
    return res.status(200).send({ message: "created succesfully" })
  } catch (err) {
    return res.status(400).send({ message: "Missing key data" });
  }
}


exports.create_branch_post = async (req, res, next) => {
try{
  const newBranch = await admin_services.createBranch(req.body);
  console.log(newBranch);
  res.status(201).send("branch created succesfully");

}catch(err){
  console.log(err);
}



  /* try {
    const branchResult = await admin_services.createBranch(req.body)
    if (branchResult.status === 201) {
      return res.status(201).send({ message: "created succesfully" })
    }

    if (branchResult.status === 400) {
      return res.status(400).send({ message: "bad request" })
    }
    else {
      return res.status(404).send({ message: "unknown error" })
    }
  } catch (err) {
    return res.status(400).send({ message: "Missing key data" });
  } */
}


exports.edit_operator_put = async (req, res, next) => {
  const branchId = req.params.branchId
  const body = { email: req.body.email, phone: req.body.phone, operator: req.body.operator, name: req.body.name, password: req.body.password }
  try {
    if (typeof (body.phone) !== "number" || typeof (body.email) !== "string" || typeof (body.operator) !== "boolean" || typeof (body.name) !== "string" || typeof (body.password) !== "string") {
      return res.status(400).send({ message: "invalid type of body" })
    }
    const operador = await User.create(body);
    const user = { id: operador.id, email: operador.email, phone: operador.phone, operator: operador.operator }

    const updatedBranch = await Branch.findOneAndUpdate({ _id: branchId }, { $set: { user: user } }, { new: true })
    const savedBranch = await updatedBranch.save()
    return res.status(200).send(savedBranch)

  } catch (err) {
    return res.status(400).send({ message: "Missing key data" });
  }
}


exports.edit_branch_info = async (req, res, next) => {
  const { branchId } = req.params
  const { hourRange, allowedClients } = req.body
  try {
    const updatedBranch = await Branch.findOneAndUpdate({ _id: branchId }, { $set: { allowedClients: allowedClients, hourRange: hourRange } }, { new: true })
    const savedBranch = await updatedBranch.save()
    return res.status(200).send(savedBranch)
  } catch (err) {
    return res.status(400).send({ message: "Missing key data" });
  }
}


exports.delete_branch_delete = async (req, res, next) => {
  const { branchId } = req.params
  try {
    const deletedBranch = await Branch.findByIdAndRemove(branchId)
    if (!deletedBranch) {
      return res.status(404).send({ message: "branch not found " })
    } else {
      return res.status(200).send({ message: "Deleted succesfully" })
    }
  } catch (err) {
    return res.status(400).send({ message: "Missing key data" });
  }
}



exports.delete_user_delete = async (req, res, next) => {
  const { userId } = req.params
  try {
    const deletedUser = await User.findByIdAndRemove(userId)
    if (!deletedUser) {
      return res.status(404).send({ message: "user not found " })
    } else {
      return res.status(200).send({ message: "Deleted succesfully" })
    }
  } catch (err) {
    return res.status(400).send({ message: "Missing key data" });
  }
}


exports.get_all_users_get = async (req, res, next) => {
  const { number } = req.params
  try {
    const limit = number * 7
    const allUsers = await User.find()
    if (!allUsers[0].name) {
      return res.status(400).send({ message: "users dont exist" })
    } else {
      const filter = allUsers.map((item) => { return { name: item.name, id: item.id, email: item.email, salt: item.salt } })
      if (!filter[0].name) {
        return res.status(400).send("failed to map the data")
      }
      const page = filter.splice(limit - 7, limit)
      return res.status(200).send(page)
    }
  }
  catch (err) {
    return res.status(400).send({ message: "Missing key data" });
  }
}

exports.get_all_operators_get = async (req, res, next) => {
  const number = req.params.number
  try {
    if (!req.params.number) {
      return res.status(400).send({ message: "Number of page is necessary" })
    }
    const limit = number * 7
    const allUsers = await User.find({ operator: true })
    if (!allUsers[0].name) {
      return res.status(400).send({ message: "operators dont exist" })
    } else {
      const allBranches = await Branch.find()
      if (!allBranches[0].location) {
        return res.status(400).send({ message: "No branches found" })
      }
      const operatorsMapper = allUsers.map((item) => { return { name: item.name, id: item.id, email: item.email, salt: item.salt, sucursal: allBranches.filter((branchItem) => { return branchItem.user.id.toString() === item.id })[0].location } })
      if (!operatorsMapper[0].name) {
        return res.status(400).send({ message: "failed to map the data" })
      }
      const page = operatorsMapper.splice(limit - 7, limit)
      return res.status(200).send(page)
    }
  }
  catch (err) {
    return res.status(400).send({ message: "Missing key data" });
  }
}


exports.get_all_branches_get = async (req, res, next) => {
  const number = req.params.number
  try {
    const limit = number * 7
    const allBranches = await Branch.find()
    if (!allBranches) {
      return res.status(400).send({ message: "branches dont exist" })
    } else {
      const branchesData = allBranches.map((item) => {
        return { email: item.user.email, allowedClients: item.allowedClients, hourRange: item.hourRange, id: item.id }
      })
      if (!branchesData[0].email) {
        return res.status(400).send({ message: "failed to map the data" })
      }
      const page = branchesData.splice(limit - 7, limit)
      return res.status(200).send(page)
    }
  } catch (err) {
    return res.status(400).send({ message: "Missing key data" });
  }

}