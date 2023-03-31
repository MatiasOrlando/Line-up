const router = require("express").Router();
const validateMiddleware = require("../config/validateMiddleware").isAdmin
const adminController = require("../controllers/admin_controller")

// admin id 
router.post("/:id", validateMiddleware, adminController.create_branch_post);

// admin id , branch id , req.body = new Operator COMPLETO
router.put("/:id/editOperator/:branchId", validateMiddleware, adminController.edit_operator_put);

router.put("/:id/editBranchInfo/:branchId", validateMiddleware, adminController.edit_branch_info);

router.delete("/:id/deleteBranch/:branchId", validateMiddleware , adminController.delete_branch_delete);

router.delete("/:id/deleteUser/:userId", validateMiddleware, adminController.delete_user_delete);

router.get("/:id/user/:number", validateMiddleware, adminController.get_all_users_get);

router.get("/:id/operator/:number", validateMiddleware, adminController.get_all_operators_get);

router.get("/:id/branch/:number", validateMiddleware, adminController.get_all_branches_get);
 

module.exports = router;

