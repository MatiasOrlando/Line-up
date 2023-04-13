const Branch = require("../models/branch");

class BranchsService {
  static async getSingleBranch(branch) {
    try {
      const selectedBranch = await Branch.find({ name: branch });
      return { error: false, data: selectedBranch };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async getAllBranchs() {
    try {
      const branchesNames = await Branch.find({ enabled: true });
      return { error: false, data: branchesNames };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async editOneBranch(idLocation, name, email) {
    try {
      const newBranch = await Branch.findByIdAndUpdate({ _id: idLocation }, {
        $set: {
          "user.name": name,
          "user.email": email,
        }
      }, {
        new: true
      })
      return { error: false, data: "Se edito la sucursal" };
    } catch (err) {
      return { error: true, data: err };
    }
  }
}

module.exports = BranchsService;
