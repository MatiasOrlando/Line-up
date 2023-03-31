const User = require("../models/user");
const Branch = require("../models/branch");
const admin_services = require("../services/admin_services")



exports.create_branch_post = async (req, res, next) => {
  const { name, location, hourRange, allowedClients } = req.body;
  const user = req.body.user
  try {
    if (
      !user.email ||
      !user.phone ||
      !user.operator ||
      !user.name ||
      !user.password ||
      !name ||
      !location ||
      !hourRange ||
      !allowedClients
    ) {
      return res.status(400).send({ message: "Missing key data" });
    }
    const userInfo = {name: user.name, email: user.email, phone: user.phone, operator: user.operator, password: user.password}
    const branchInfo = {name, location, hourRange, allowedClients}
    const branchResult = await admin_services.createBranch(branchInfo, userInfo)
    if(!branchResult.location){
       return res.status(404).send({message: "unknown error"})
    }
    return res.status(200).send({message: "created succesfully"})
  } catch (err) {
    return res.status(400).send({message: "failed to pass neccesary information"})
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
    const body = { email: req.body.email, phone: req.body.phone, operator: req.body.operator, name: req.body.name, password: req.body.password }

    if (typeof (body.phone) !== "number" || typeof (body.email) !== "string" || typeof (body.operator) !== "boolean" || typeof (body.name) !== "string" || typeof (body.password) !== "string") {
      return res.status(400).send({ message: "invalid type of body" })
    }

    const operador = await User.create(body);
    console.log("OPERATOR", operador)
    const { id, email, phone, operator } = operador;
    const user = { id, email, phone, operator }


    if (
      !id ||
      !email ||
      !phone ||
      !operator || !user) {
      return res.status(400).send({ message: "Missing key data" });
    }


    const updatedBranch = await Branch.findOneAndUpdate({ _id: branchId }, { $set: { user: user } }, { new: true })
    const savedBranch = await updatedBranch.save()
    return res.status(200).send(savedBranch)

  } catch (err) {
    console.log(err);
  }
}


exports.edit_branch_info = async (req, res, next) => {
  const branchId = req.params.branchId
  const { hourRange, allowedClients } = req.body
  try {
    console.log("REQ BODY", req.body)
    if (
      !hourRange ||
      !allowedClients ||
      !branchId) {
      return res.status(400).send({ message: "Missing key data" });
    }

    const updatedBranch = await Branch.findOneAndUpdate({ _id: branchId }, { $set: { allowedClients: allowedClients, hourRange: hourRange } }, { new: true })
    const savedBranch = await updatedBranch.save()
    return res.status(200).send(savedBranch)

  } catch (err) {
    console.log(err);
  }
}


exports.delete_branch_delete = async (req, res, next) => {
  const branchId = req.params.branchId
  try {
    if (!branchId) {
      return res.status(400).send({ message: "Invalid branchId value" });
    }

    const deletedBranch = await Branch.findByIdAndRemove(branchId)
    if (!deletedBranch) {
      return res.status(404).send({ message: "branch not found " })
    } else {
      return res.status(200).send({ message: "Deleted succesfully" })
    }
  } catch (err) {
    console.log(err);
  }
}



exports.delete_user_delete = async (req, res, next) => {
  const userId = req.params.userId
  try {
    if (!userId) {
      return res.status(400).send({ message: "Invalid userId value" });
    }

    const deletedUser = await User.findByIdAndRemove(userId)
    if (!deletedUser) {
      return res.status(404).send({ message: "user not found " })
    } else {
      return res.status(200).send({ message: "Deleted succesfully" })
    }
  } catch (err) {
    console.log(err);
  }
}


exports.get_all_users_get = async (req, res, next) => {
  try {
    if (!req.params.number) {
      return res.status(400).send({ message: "Number of page is necessary" })
    }
    const number = req.params.number
    const limit = number * 12
    const allUsers = await User.find()
    if (!allUsers[0].name) {
      return res.status(400).send({ message: "users dont exist" })
    } else {
      const filter = allUsers.map((item) => { return { name: item.name, id: item.id, email: item.email, salt: item.salt } })
      if (!filter[0].name) {
        return res.status(400).send("failed to filter the users")
      }
      const page = filter.splice(limit - 12, limit)
      return res.status(200).send(page)
    }
  }
  catch (err) {
    console.log(err)
  }
}

exports.get_all_operators_get = async (req, res, next) => {
  try {
    if (!req.params.number) {
      return res.status(400).send({ message: "Number of page is necessary" })
    }
    const number = req.params.number
    const limit = number * 12
    const allUsers = await User.find({ operator: true })
    if (!allUsers[0].name) {
      return res.status(400).send({ message: "users dont exist" })
    } else {
      const allBranches = await Branch.find()
      if (!allBranches[0].location) {
        return res.status(400).send({ message: "No branches found" })
      }
      const operatorsMapper = allUsers.map((item) => { return { name: item.name, id: item.id, email: item.email, salt: item.salt, sucursal: allBranches.filter((branchItem) => { return branchItem.user.id.toString() === item.id })[0].location } })
      if (!operatorsMapper[0].name) {
        return res.status(400).send({ message: "Incomplete data" })
      }
      const page = operatorsMapper.splice(limit - 12, limit)
      return res.status(200).send(page)
    }
  }
  catch (err) {
    console.log(err)
  }
}


exports.get_all_branches_get = async (req, res, next) => {
  try {
    if (!req.params.number) {
      return res.status(400).send({ message: "Number of page is necessary" })
    }
    const number = req.params.number
    const limit = number * 12
    const allBranches = await Branch.find()
    if (!allBranches) {
      return res.status(400).send({ message: "branches dont exist" })
    } else {
      const branchesData = allBranches.map((item) => {
        return { email: item.user.email, allowedClients: item.allowedClients, hourRange: item.hourRange, id: item.id }
      })
      if (!branchesData[0].email) {
        return res.status(400).send({ message: "Failed to map the wanted data" })
      }
      const page = branchesData.splice(limit - 12, limit)
      return res.status(200).send(branchesData)
    }
  } catch (err) {
    console.log(err)
  }

}