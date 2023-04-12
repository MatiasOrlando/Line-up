const { userSchema, Usuario } = require("../models/tsUser")
const { Branch, brachSchema } = require("../models/tsBranch");

interface UsuarioSchema {
   _id: string;
   name: string;
   email: string;
   password: string,
   operator: boolean,
   admin: boolean,
   phone: number,
   dni: number,
}


interface getAllBranchShema {
   _id: string;
   name: string;
   email: string;
   openingHour: string;
   closingHour: string;
   allowedClients: number;
   /* userId: string, */
}

interface userInBranchSchema {
   _id: string;
   name: string;
   email: string;
   phone: number;
   operator: boolean;
}

interface BranchShema {
   _id: string;
   name: string;
   email: string;
   openingHour: string;
   closingHour: string;
   allowedClients: number;
   user: userInBranchSchema
}

interface newBranchSchema {
   name: string;
   location: string;
   openingHour: string;
   closingHour: string;
   allowedClients: number;
}

interface DeleteWriteOpResultObject {
   result: {
      n: number;
      ok: number;
   };
   connection: any;
   deletedCount: number;
}

interface editBranchInfo {
   closingHour: string,
   openingHour: string,
   allowedClients: number
}




export default class administrator_services {

   static async createOperator(newUser: UsuarioSchema, location: string): Promise<{ error: boolean, message: string }> {
      try {
         const user: userInBranchSchema = await Usuario.create(newUser);
         const { name, email, phone, operator, _id } = user;
         const updateBranch: BranchShema = await Branch.findOneAndUpdate({ location: location }, { $set: { user: { name, email, phone, operator, _id } } }, { new: true });
         return { error: false, message: "Successfully create operator and assing him into a branch" };
      } catch (err: unknown) {
         if (err instanceof Error) {
            return { error: true, message: err.message };
         }
         return { error: true, message: "Unknown Error, failed to create operator and assing him into a branch" };
      }
   }

   static async createOperatorAndBranch(newBranch: newBranchSchema, newUser: UsuarioSchema): Promise<{ error: boolean, message: string }> {
      try {
         const user: userInBranchSchema = await Usuario.create(newUser);
         const { name, email, phone, operator, _id } = user
         const branch: BranchShema = await Branch.create({ name: newBranch.name, openingHour: newBranch.openingHour, closingHour: newBranch.closingHour, location: newBranch.location, allowedClients: newBranch.allowedClients, user: { name, email, phone, operator, _id } },);
         return { error: false, message: "Successfully created Operator and Branch" };
      } catch (err: unknown) {
         if (err instanceof Error) {
            return { error: true, message: err.message };
         }
         return { error: true, message: "Unknown Error, failed to create branch and operator" };
      }
   }

   static async createBranch(newBranch: newBranchSchema): Promise<{ error: boolean, message: string }> {
      try {
         const branch = await Branch.create(newBranch);
         return { error: false, message: "Successfully created a new branch" };
      } catch (err: unknown) {
         if (err instanceof Error) {
            return { error: true, message: err.message };
         } else {
            return { error: true, message: "Unknown Error, Failed to create branch" };
         }
      }
   }


   static async editOperator(branchId: string, NewOperator: UsuarioSchema): Promise<{ error: boolean, message: string }> {
      try {
         if (!NewOperator.email || !NewOperator.phone || !NewOperator.name || !NewOperator.operator || !NewOperator.dni) {
            return { error: true, message: "Missing key info for new operator" };
         }
         const user = await Usuario.create(NewOperator);
         const { _id, email, phone, name, operator } = user;
         const editedBranch: BranchShema = await Branch.findOneAndUpdate({ _id: branchId }, { $set: { user: { _id, email, phone, name, operator } } }, { new: true });
         return { error: false, message: "Successfully updated the selected branch operator" };
      } catch (err: unknown) {
         if (err instanceof Error) {
            return { error: true, message: err.message };
         } else {
            return { error: true, message: "Unknown Error, Failed to edit Operator" };
         }
      }
   }

   static async editInfoBrach(branchId: string, infoToEdit: editBranchInfo): Promise<{ error: boolean, message: string }> {
      try {
         if (!infoToEdit.openingHour && !infoToEdit.closingHour && !infoToEdit.allowedClients) {
            return { error: true, message: "Missing key data to update branch info" };
         }
         const editedBranch: BranchShema = await Branch.findOneAndUpdate({ _id: branchId }, { $set: { openingHour: infoToEdit.openingHour, closingHour: infoToEdit.closingHour, allowedClients: infoToEdit.allowedClients } }, { new: true })
         return { error: false, message: "Successfully updated the selected branch info" };
      } catch (err: unknown) {
         if (err instanceof Error) {
            return { error: true, message: err.message };
         } else {
            return { error: true, message: "Unknown Error, Failed to edit branch info" };
         }
      }
   }



   static async deleteBranch(branchId: string): Promise<{ error: boolean, message: string }> {
      try {
         console.log(branchId)
         const erasedBranch: DeleteWriteOpResultObject = await Branch.deleteOne({ _id: branchId });
         console.log(erasedBranch)
         if (erasedBranch.deletedCount === 0) {
            return { error: true, message: "Failed to find the branch from the database" };
         }
         return { error: false, message: "Successfully find and delele the branch from the database" };
      }
      catch (err: unknown) {
         if (err instanceof Error) {
            return { error: true, message: err.message };
         } else {
            return { error: true, message: "Unknown Error, Failed to delete branch" };
         }
      }
   }


   static async deleteUser(userId: string): Promise<{ error: boolean, message: string }> {
      try {
         const erasedUser: DeleteWriteOpResultObject = await Usuario.deleteOne({ _id: userId });
         if (erasedUser.deletedCount === 0) {
            return { error: true, message: "Failed to find the user from the database" };
         }
         return { error: false, message: "Successfully find and delele the user from the database" };
      }
      catch (err: unknown) {
         if (err instanceof Error) {
            return { error: true, message: err.message };
         } else {
            return { error: true, message: "Unknown Error, Failed to delete user" };
         }
      }
   }





   static async allUsers(limit: number): Promise<{ error: boolean; data: Array<UsuarioSchema>, message: string, length: number }> {
      try {
         const allUsers = await Usuario.find();
         const users: Array<UsuarioSchema> = allUsers.map(function (item: UsuarioSchema) { return { name: item.name, _id: item._id, email: item.email, password: item.password } });
         const page = users.splice(limit - 7, limit)
         return { error: false, data: page, message: "Successfully found all users", length: allUsers.length };
      } catch (err: unknown) {
         if (err instanceof Error) {
            return { error: true, message: err.message, data: [], length: 0 };
         } else {
            return { error: true, message: "Unknown Error, Failed to delete user", data: [], length: 0 };
         }
      }
   }

   static async allOperators(limit: number): Promise<{ error: boolean; data: Array<UsuarioSchema>, message: string, length: number }> {
      try {
         const allOperato = await Usuario.find({ operator: true });
         const operators = allOperato.map(function (item: UsuarioSchema) { return { name: item.name, _id: item._id, email: item.email, password: item.password } });
         const page = operators.splice(limit - 7, limit);
         return { error: false, data: page, message: "Successfully found all Operators", length: allOperato.length };
      } catch (err: unknown) {
         if (err instanceof Error) {
            return { error: true, message: err.message, data: [], length: 0 };
         } else {
            return { error: true, message: "Unknown Error, Failed to delete user", data: [], length: 0 };
         }
      }
   }

   static async allBranches(limit: number): Promise<{ error: boolean; data: Array<getAllBranchShema>, message: string, length: number }> {
      try {
         const allBranches: Array<getAllBranchShema> = await Branch.find();
         const BranchArray = allBranches.map(function (item: getAllBranchShema) { return { email: item.email, name: item.name, allowedClients: item.allowedClients, closingHour: item.closingHour, openingHour: item.openingHour, _id: item._id } });
         const page = BranchArray.splice(limit - 7, limit);
         return { error: false, data: page, message: "Successfully found all branches", length: allBranches.length };
      } catch (err: unknown) {
         if (err instanceof Error) {
            return { error: true, message: err.message, data: [], length: 0 };
         } else {
            return { error: true, message: "Unknown Error, Failed to delete user", data: [], length: 0 };
         }
      }
   }
}

