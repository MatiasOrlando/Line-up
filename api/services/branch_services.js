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
      const branchesNames = await Branch.find({enabled: true});
      return { error: false, data: branchesNames };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = BranchsService;
