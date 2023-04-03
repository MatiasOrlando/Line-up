const User = require("../models/user");
const Branch = require("../models/branch");
const router = require("express").Router();
const validateMiddleware = require("../config/validateMiddleware").isAdmin
const adminController = require("../controllers/admin_controller")

// admin id 
// CREA OPERADOR(REQ.BODY) Y LE PISA EL BRANCH.USER(VACIO) CON LOS DATOS DEL NUEVO OPERADOR, ASIGNANDOLE UN OPERADOR A LA SUCURSAL(hay que pasarle req.boy.location) Y VICE VERSA
router.post("/:id/operator", validateMiddleware, adminController.create_operator_post);

// CREA UN OPERADOR(REQ.BODY.USER) Y CREA UNA SUCURSAL(REQ.BODY) Y LE ASIGNA LOS DATOS DEL OPERADOR CREADO COMO USER
router.post("/:id", validateMiddleware, adminController.createOperatorAndBranch);

// CREA UNA SUCURSAL SIN NINGUN OPERADOR PARA QUE DESPUES SE LO ASIGNES CUANDO LO CREES EN LA PRIMERA RUTA COMO EN EL FIGMA
router.post("/:id/branch", validateMiddleware, adminController.create_branch_post);


// admin id , branch id , req.body = new Operator COMPLETO
router.put("/:id/editOperator/:branchId", validateMiddleware, adminController.edit_operator_put);

router.put("/:id/editBranchInfo/:branchId", validateMiddleware, adminController.edit_branch_info);

router.delete("/:id/deleteBranch/:branchId", validateMiddleware , adminController.delete_branch_delete);

router.delete("/:id/deleteUser/:userId", validateMiddleware, adminController.delete_user_delete);

router.get("/:id/user/:number", validateMiddleware, adminController.get_all_users_get);

router.get("/:id/operator/:number", validateMiddleware, adminController.get_all_operators_get);

router.get("/:id/branch/:number", validateMiddleware, adminController.get_all_branches_get);
 

module.exports = router;