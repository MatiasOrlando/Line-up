const router = require("express").Router();
const adminController = require("../controllers/admin_controller")
const validateMiddleware = require("../middleWare/validateMiddleware");


// admin id 
// CREA OPERADOR(REQ.BODY) Y LE PISA EL BRANCH.USER(VACIO) CON LOS DATOS DEL NUEVO OPERADOR, ASIGNANDOLE UN OPERADOR A LA SUCURSAL(hay que pasarle req.boy.location) Y VICE VERSA
router.post("/create-operator", validateMiddleware.isAdmin, adminController.create_operator_post);

// CREA UN OPERADOR(REQ.BODY.USER) Y CREA UNA SUCURSAL(REQ.BODY) Y LE ASIGNA LOS DATOS DEL OPERADOR CREADO COMO USER
router.post("/create-branch-and-operator", validateMiddleware.isAdmin, adminController.createOperatorAndBranch);

// CREA UNA SUCURSAL SIN NINGUN OPERADOR PARA QUE DESPUES SE LO ASIGNES CUANDO LO CREES EN LA PRIMERA RUTA COMO EN EL FIGMA
router.post("/create-branch", validateMiddleware.isAdmin, adminController.create_branch_post);


// MODIFICA EL OPERADOR DE UNA SUCURSAL, LA BRANCH LA ENCUENTRA POR(req.params.branchId) y le llega por body todos los datos del nuevo operador para crear 
//const body = { email: req.body.email, phone: req.body.phone, operator: req.body.operator, name: req.body.name, password: req.body.password }
router.put("/edit-operator/:branchId", validateMiddleware.isAdmin, adminController.edit_operator_put);

// MODIFICA LA INFORMACION DE LA BRANCH(NO EL OPERADOR),  const { hourRange, allowedClients } = req.body, const { branchId } = req.params  
// LA SUCURSAL LA ENCUETRA POR branchId y le modifica el hourRange o u y AllowedClients
router.put("/edit-branch-info/:branchId", validateMiddleware.isAdmin, adminController.edit_branch_info);


// BORRA UNA SUCURSAL QUE SE LE PASE POR PARAMS  const { branchId } = req.params
router.delete("/delete-branch/:branchId", validateMiddleware.isAdmin , adminController.delete_branch_delete);

// BORRA UN USUARIO QUE SE LE PASE POR PARAMS  const { userId } = req.params
router.delete("/delete-user/:userId", validateMiddleware.isAdmin, adminController.delete_user_delete);

// TRAE TODOS LOS USUARIOS DEL LA PAGINA QUE LE PASES COMO PARAMS, SI EL NUMERO ES 1 TRAE LOS USUARIOS DEL 1 AL 7, SI EL NUMERO ES 2 TRAE LOS USUARIOS DEL 7 AL 14
router.get("/get-all-users/:number", validateMiddleware.isAdmin, adminController.get_all_users_get);

// TRAE TODOS LOS OPERADORES DE LA PAGINA QUE LE PASES COMO PARAMS, SI EL NUMERO ES 1 TRAE LOS OPERADORES DEL 1 AL 7, SI EL NUMERO ES 2 TRAE LOS OPERADORES DEL 7 AL 14
router.get("/get-all-operators/:number", validateMiddleware.isAdmin, adminController.get_all_operators_get);

// TRAE TODOS LOS SUCURSALES DE LA PAGINA QUE LE PASES COMO PARAMS, SI EL NUMERO ES 1 TRAE LAS SUCURSALES DEL 1 AL 7, SI EL NUMERO ES 2 TRAE LAS SUCURSALES DEL 7 AL 14
router.get("/get-all-branches/:number", validateMiddleware.isAdmin, adminController.get_all_branches_get);
 

module.exports = router;
