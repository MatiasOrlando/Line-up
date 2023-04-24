const { admin_services } = require("../services/admin_services");
const BranchsService = require("../services/branch_services");

exports.create_operator_post = async (req, res, next) => {
  const operatorInfo = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    operator: req.body.operator,
    password: req.body.password,
    dni: req.body.dni,
    status: "enabled"
  };
  const { location } = req.body;
  try {
    if (
      typeof operatorInfo.phone !== "number" ||
      typeof operatorInfo.email !== "string" ||
      operatorInfo.operator !== true ||
      typeof operatorInfo.name !== "string" ||
      typeof operatorInfo.password !== "string" ||
      typeof operatorInfo.dni !== "number" ||
      typeof location !== "string"
    ) {
      return res.status(400).send({ message: "invalid data types" });
    }
    const operatorResult = await admin_services.create_operator(
      operatorInfo,
      location
    );
    if (!operatorResult.error) {
      return res
        .status(201)
        .send({ message: "operator created succesfully in the database" });
    }
    return res.status(400).send({ message: operatorResult.data.message });
  } catch (err) {
    return res
      .status(400)
      .send({ message: "failed to create the operator in the database" });
  }
};

exports.createOperatorAndBranch = async (req, res, next) => {
  const branchInfo = {
    name: req.body.name,
    location: req.body.location,
    closingHour: req.body.closingHour,
    openingHour: req.body.openingHour,
    allowedClients: req.body.allowedClients,
  };
  const userInfo = {
    name: req.body.user.name,
    email: req.body.user.email,
    phone: req.body.user.phone,
    operator: req.body.user.operator,
    password: req.body.user.password,
    dni: req.body.user.dni,
  };
  try {
    if (
      typeof userInfo.phone !== "number" ||
      typeof userInfo.email !== "string" ||
      typeof userInfo.operator !== "boolean" ||
      typeof userInfo.name !== "string" ||
      typeof userInfo.password !== "string"
    ) {
      return res.status(400).send({ message: "invalid type of body" });
    }
    const branchResult = await admin_services.createOperatorBranch(
      branchInfo,
      userInfo
    );
    if (!branchResult.error) {
      return res.status(200).send({
        message: "operator and branch created succesfully in the database",
      });
    }
    return res.status(400).send({ message: branchResult.data.message });
  } catch (err) {
    return res.status(400).send({
      message: "failed to create the operator and branch in the database",
    });
  }
};

exports.createBranchContoller = async (req, res, next) => {
  const body = {
    name: req.body.name,
    location: req.body.location,
    closingHour: req.body.closingHour,
    openingHour: req.body.openingHour,
    allowedClients: req.body.allowedClients,
  };
  try {
    if (
      typeof body.name !== "string" ||
      typeof body.location !== "string" ||
      typeof body.openingHour !== "string" ||
      typeof body.closingHour !== "string" ||
      typeof body.allowedClients !== "number"
    ) {
      return res.status(400).send({ message: "invalid data types" });
    }

    const branchResult = await admin_services.createBranchOnly(body);
    if (!branchResult.error) {
      return res.status(201).send({ message: "created succesfully" });
    }
    return res.status(400).send({ message: branchResult.data.message });
  } catch (err) {
    return res
      .status(400)
      .send({ message: "failed to create the branch in the database" });
  }
};

exports.edit_operator_put = async (req, res, next) => {
  const branchId = req.params.branchId;
  const body = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    dni: req.body.dni,
  };
  try {
    if (
      typeof body.email !== "string" ||
      typeof body.name !== "string" ||
      typeof body.password !== "string"
    ) {
      return res.status(400).send({ message: "invalid data type" });
    }
    const updateOperator = await admin_services.editOperator(branchId, body);
    if (!updateOperator.error) {
      return res.status(200).send({ message: "operator updated succesfully" });
    }
    return res.status(400).send({ message: updateOperator.data.message });
  } catch (err) {
    return res
      .status(400)
      .send({ message: "failed to update the operator in the branch" });
  }
};

exports.edit_branch_info = async (req, res, next) => {
  const { branchId } = req.params;
  const { closingHour, openingHour, allowedClients } = req.body;
  try {
    const updatedBranchInfo = await admin_services.editBranchInfo(
      branchId,
      openingHour,
      closingHour,
      allowedClients
    );
    if (!updatedBranchInfo.error) {
      return res
        .status(200)
        .send({ message: "branch info updated succesfully" });
    }
    return res.status(400).send({ message: updatedBranchInfo.data.message });
  } catch (err) {
    return res
      .status(400)
      .send({ message: "failed to update the branch info" });
  }
};

exports.delete_branch_delete = async (req, res, next) => {
  const { branchId } = req.params;
  try {
    const deletedBranch = await admin_services.deleteBranch(branchId);
    if (!deletedBranch.error) {
      return res
        .status(200)
        .send({ message: "branch erased succesfully from the database" });
    }
    return res.status(400).send({ message: deletedBranch.data.message });
  } catch (err) {
    return res
      .status(400)
      .send({ message: "failed to delete the branch from the database" });
  }
};

exports.delete_user_delete = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const deletedUser = await admin_services.deleteUser(userId);
    if (!deletedUser.error) {
      return res
        .status(200)
        .send({ message: "user erased succesfully from the database" });
    }

    return res.status(400).send({ message: deletedUser.data.message });
  } catch (err) {
    return res
      .status(400)
      .send({ message: "failed to delete the user from the database" });
  }
};

exports.get_all_users_get = async (req, res, next) => {
  const { number } = req.params;
  const limit = number * 7;
  try {
    const allUsers = await admin_services.getAllUser(limit);
    if (!allUsers.error) {
      return res.status(200).send(allUsers);
    }
    return res.status(400).send({ message: allUsers.data.message });
  } catch (err) {
    return res.status(400).send({
      message:
        "failed to get all users in page: " + number + " from the database",
    });
  }
};

exports.get_all_operators_get = async (req, res, next) => {
  const number = req.params.number;
  const limit = number * 7;
  try {
    const allOperators = await admin_services.getAllOperator(limit);
    if (!allOperators.error) {
      return res.status(200).send(allOperators);
    }
    return res.status(400).send({ message: allOperators.data.message });
  } catch (err) {
    return res.status(400).send({
      message:
        "failed to get all operators in page " + number + " from the database",
    });
  }
};

exports.get_all_branches_get = async (req, res, next) => {
  const number = req.params.number;
  const limit = number * 7;
  try {
    const allBranches = await admin_services.getAllBraches(limit);
    if (!allBranches.error) {
      return res.status(200).send(allBranches);
    }
    return res.status(400).send({ message: allBranches.data.message });
  } catch (err) {
    return res.status(400).send({
      message:
        "failed to get all branches in page " + number + " from the database",
    });
  }
};

exports.get_all_branches_enabled_get = async (req, res, next) => {
  try {
    const allBranches = await admin_services.getAllBrachesEnabled();
    if (!allBranches.error) {
      return res.status(200).send(allBranches);
    }
    return res.status(400).send({ message: allBranches.data.message });
  } catch (err) {
    return res.status(400).send({
      message: "failed to get all enabled branches from the database",
    });
  }
};

exports.get_one_branche_get = async (req, res, next) => {
  try {
    const id = req.params.id;
    const branche = await admin_services.getOneBrache(id);
    if (!branche.error) {
      return res.status(200).send(branche);
    }
    return res.status(400).send({ message: allBranches.data.message });
  } catch (err) {
    return res.status(400).send({
      message: "failed to get one branches whit this id from the database",
    });
  }
};

exports.edit_one_operator = async (req, res, next) => {
  try {
    const idUser = req.params.idUser;
    const { name, email, password, dni, location, idLocation } = req.body;

    const updateUser = await admin_services.editOneOperator(
      idUser,
      name,
      email,
      password,
      dni
    );
    if (!updateUser.err) {

      const updateBranch = await BranchsService.editOneBranch(idLocation, name, email)
      res.status(200).send("Change correct")
    }
  } catch (err) {
    res.send(401).send("Error")
  }
};
