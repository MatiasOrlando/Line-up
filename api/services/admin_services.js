const User = require("../models/user");
const Branch = require("../models/branch");

class admin_services {
  static async create_operator(operatorInfo, location) {
    try {
      const newOperator = await User.create(operatorInfo);
      const user = {
        id: newOperator.id,
        name: newOperator.name,
        email: newOperator.email,
        phone: newOperator.phone,
        operator: newOperator.operator,
      };
      const branch = await Branch.findOne({ location });
      branch.enabled = true;
      branch.save();
      if (!branch.user.email) {
        const updatedBranch = await Branch.findOneAndUpdate(
          { location: location },
          { $set: { user: user } },
          { new: true }
        );
        updatedBranch.save();
        return { error: false, data: updatedBranch };
      }
      return { error: true, message: "This location already has an operator" };
    } catch (err) {
      return { error: true, data: err };
    }
  }

  static async createOperatorBranch(branchInfo, userInfo) {
    try {
      const operador = await User.create(userInfo);
      const { id, email, phone, operator, name } = operador;
      const createdBranch = await Branch.create({
        name: branchInfo.name,
        location: branchInfo.location,
        closingHour: branchInfo.closingHour,
        openingHour: branchInfo.openingHour,
        allowedClients: branchInfo.allowedClients,
        user: { id, email, phone, operator, name },
      });
      return { error: false, data: createdBranch };
    } catch (err) {
      return { error: true, data: err };
    }
  }

  static async createBranchOnly(body) {
    try {
      const createdBranch = await Branch.create({
        name: body.name,
        location: body.location,
        closingHour: body.closingHour,
        openingHour: body.openingHour,
        allowedClients: body.allowedClients,
      });
      return { error: false, data: createdBranch };
    } catch (err) {
      return { error: true, data: err };
    }
  }

  static async editOperator(branchId, body) {
    try {
      const operador = await User.create(body);
      const user = {
        id: operador.id,
        email: operador.email,
      };
      const updatedBranch = await Branch.findOneAndUpdate(
        { name: branchId },
        { $set: { user: user } },
        { new: true }
      );

      const savedBranch = await updatedBranch.save();
      return { error: false, data: savedBranch };
    } catch (err) {
      return { error: true, data: err };
    }
  }

  static async editBranchInfo(
    branchId,
    openingHour,
    closingHour,
    allowedClients
  ) {
    try {
      const updatedBranch = await Branch.findOneAndUpdate(
        { _id: branchId },
        {
          $set: {
            openingHour: openingHour,
            closingHour: closingHour,
            allowedClients: allowedClients,
          },
        },
        { new: true }
      );
      const savedBranch = await updatedBranch.save();
      return { error: false, data: savedBranch };
    } catch (err) {
      return { error: true, data: err };
    }
  }

  static async deleteBranch(branchId) {
    try {
      const deletedBranch = await Branch.deleteOne({ _id: branchId });
      if (deletedBranch.deletedCount === 0) {
        return { error: true, data: null };
      }
      return { error: false, data: deletedBranch };
    } catch (err) {
      return { error: true, data: err };
    }
  }

  static async deleteUser(userId) {
    try {
      const deletedUser = await User.deleteOne({ _id: userId });
      if (deletedUser.deletedCount === 0) {
        return { error: true, data: null };
      }
      return { error: false, data: deletedUser };
    } catch (err) {
      return { error: true, data: err };
    }
  }

  static async getAllUser(limit) {
    try {
      const allUsers = await User.find();
      const filter = allUsers.map((item) => {
        return {
          name: item.name,
          id: item.id,
          email: item.email,
          salt: item.salt,
        };
      });
      const page = filter.splice(limit - 7, limit);
      return { error: false, data: page };
    } catch (err) {
      return { error: true, data: err };
    }
  }

  static async getAllOperator(limit) {
    try {
      const allUsers = await User.find({ operator: true });
      const allBranches = await Branch.find();
      const operatorsMapper = allUsers.map((item) => {
        return {
          name: item.name,
          id: item.id,
          email: item.email,
          salt: item.salt,
          sucursal: allBranches.filter((branchItem) => {
            return branchItem.user.email === item.email;
          }),
        };
      });
      const page = operatorsMapper.splice(limit - 7, limit);
      return { error: false, data: page, length: allUsers.length };
    } catch (err) {
      return { error: true, data: err };
    }
  }

  /*  static async getAllBraches() {
     try {
       const allBranches = await Branch.find({ enabled: false });
       if (!allBranches) {
         return { error: true, data: err };
       }
       return { error: false, data: allBranches };
     } catch (err) {
       return { error: true, data: err };
     }
   } */

  static async getOneBrache(id) {
    try {
      const branche = await Branch.findById(id);
      if (!branche) {
        return { error: true, data: err };
      }
      return { error: false, data: branche };
    } catch (err) {
      return { error: true, data: err };
    }
  }
  static async editOneOperator(idUser, name, email, password, dni) {
    try {
      const newUser = await User.findByIdAndUpdate(
        { _id: idUser },
        {
          $set: {
            name,
            email,
            password,
            dni,
          },
        },
        {
          new: true,
        }
      );
      newUser.save();
      return { error: false, data: "Se cambiaron los datos del operador" };
    } catch (err) {
      return { error: false, data: err.message };
    }
  }
  static async getAllBrachesEnabled() {
    try {
      const allBranches = await Branch.find({ enabled: false });
      if (!allBranches) {
        return { error: true, data: err };
      }
      return { error: false, data: allBranches };
    } catch (err) {
      return { error: true, data: err };
    }
  }

  static async getAllBraches(limit) {
    try {
      const allBranches = await Branch.find();
      const branchesData = allBranches.map((item) => {
        return {
          email: item.user.email,
          name: item.location,
          allowedClients: item.allowedClients,
          openingHour: item.openingHour,
          closingHour: item.closingHour,
          id: item.id,
        };
      });
      const page = branchesData.splice(limit - 7, limit);
      return { error: false, data: page, length: allBranches.length };
    } catch (err) {
      return { error: true, data: err };
    }
  }
}

module.exports = { admin_services };
