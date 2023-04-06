const router = require("express").Router();
const adminController = require("../controllers/admin_controller")
const validateMiddleware = require("../middleWare/validateMiddleware");

/**
 * @openapi
 * /api/admin/create-branch:
 *   post:
 *     tags:
 *       - branches
 *     summary: Create a new branch in the database with user null
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token for authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBranchWithOperatorNull'
 *       required: true
 *     responses:
 *       201:
 *         description: (OK) Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBranchWithOperatorNull'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     securitySchemes:
 *       ApiKeyAuth:
 *         type: apiKey
 *         name: token
 *         in: query
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User unauthorized
 *       NotFound:
 *         description: (NotFound) No se encontró información
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 */

/**
 * @openapi
 * /api/admin/create-operator:
 *   post:
 *     tags:
 *       - operators
 *     summary: create a new operator and assigned him into a branch
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token for authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createOperator'
 *       required: true
 *     responses:
 *       201:
 *         description: (OK) Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createOperator'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     securitySchemes:
 *       ApiKeyAuth:
 *         type: apiKey
 *         name: token
 *         in: query
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User unauthorized
 *       NotFound:
 *         description: (NotFound) No se encontró información
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 */

/**
 * @openapi
 * /api/admin/create-branch-and-operator:
 *   post:
 *     tags:
 *       - operators - branches
 *     summary: create a new operator and assigned him into a branch
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token for authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBranch'
 *       required: true
 *     responses:
 *       201:
 *         description: (OK) Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBranch   '
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     securitySchemes:
 *       ApiKeyAuth:
 *         type: apiKey
 *         name: token
 *         in: query
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User unauthorized
 *       NotFound:
 *         description: (NotFound) No se encontró información
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 */

/**
 * @openapi
 * /api/admin/edit-operator/{branchId}:
 *   put:
 *     tags:
 *       - operators - branches
 *     summary: edit operator of a branch
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: branchId
 *         in: path
 *         schema: 
 *           type: string
 *         required: true
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token for authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/editOperator'
 *       required: true
 *     responses:
 *       200:
 *         description: (OK) Modified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/editOperator'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     securitySchemes:
 *       ApiKeyAuth:
 *         type: apiKey
 *         name: token
 *         in: query
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User unauthorized
 *       NotFound:
 *         description: (NotFound) No se encontró información
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 */

/**
 * @openapi
 * /api/admin/edit-branch-info/{branchId}:
 *   put:
 *     tags:
 *       - branches 
 *     summary: edit branch info 
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: branchId
 *         in: path
 *         schema: 
 *           type: string
 *         required: true
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token for authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/editBranch'
 *       required: true
 *     responses:
 *       200:
 *         description: (OK) Modified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/editBranch'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     securitySchemes:
 *       ApiKeyAuth:
 *         type: apiKey
 *         name: token
 *         in: query
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User unauthorized
 *       NotFound:
 *         description: (NotFound) No se encontró información
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 */

/**
 * @openapi
 * /api/admin/delete-user/{userId}:
 *   delete:
 *     tags:
 *       - branch 
 *     summary: delete user 
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         schema: 
 *           type: string
 *         required: true
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token for authentication
 *     responses:
 *       200:
 *         description: (OK) Deleted
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     securitySchemes:
 *       ApiKeyAuth:
 *         type: apiKey
 *         name: token
 *         in: query
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User unauthorized
 *       NotFound:
 *         description: (NotFound) No se encontró información
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 */

/**
 * @openapi
 * /api/admin/delete-branch/{branchId}:
 *   delete:
 *     tags:
 *       - branches 
 *     summary: delete branch 
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: branchId
 *         in: path
 *         schema: 
 *           type: string
 *         required: true
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token for authentication
 *     responses:
 *       200:
 *         description: (OK) Deleted
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     securitySchemes:
 *       ApiKeyAuth:
 *         type: apiKey
 *         name: token
 *         in: query
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User unauthorized
 *       NotFound:
 *         description: (NotFound) No se encontró información
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 */

/**
 * @openapi
 * /api/admin/get-all-users/{number}:
 *   get:
 *     tags:
 *       - users 
 *     summary: get all users
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: number
 *         in: path
 *         schema: 
 *           type: number
 *         required: true
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token for authentication
 *     responses:
 *       200:
 *         description: (OK) OK
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     securitySchemes:
 *       ApiKeyAuth:
 *         type: apiKey
 *         name: token
 *         in: query
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User unauthorized
 *       NotFound:
 *         description: (NotFound) No se encontró información
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 */

/**
 * @openapi
 * /api/admin/get-all-branches/{number}:
 *   get:
 *     tags:
 *       - branches 
 *     summary: get all branches
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: number
 *         in: path
 *         schema: 
 *           type: number
 *         required: true
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token for authentication
 *     responses:
 *       200:
 *         description: (OK) OK
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     securitySchemes:
 *       ApiKeyAuth:
 *         type: apiKey
 *         name: token
 *         in: query
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User unauthorized
 *       NotFound:
 *         description: (NotFound) No se encontró información
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 */

/**
 * @openapi
 * /api/admin/get-all-operators/{number}:
 *   get:
 *     tags:
 *       - operators 
 *     summary: get all operators
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: number
 *         in: path
 *         schema: 
 *           type: number
 *         required: true
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token for authentication
 *     responses:
 *       200:
 *         description: (OK) OK
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     securitySchemes:
 *       ApiKeyAuth:
 *         type: apiKey
 *         name: token
 *         in: query
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User unauthorized
 *       NotFound:
 *         description: (NotFound) No se encontró información
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 */









// admin id 
// CREA OPERADOR(REQ.BODY) Y LE PISA EL BRANCH.USER(VACIO) CON LOS DATOS DEL NUEVO OPERADOR, ASIGNANDOLE UN OPERADOR A LA SUCURSAL(hay que pasarle req.boy.location) Y VICE VERSA
router.post("/create-operator", validateMiddleware.isAdmin, adminController.create_operator_post);

// CREA UN OPERADOR(REQ.BODY.USER) Y CREA UNA SUCURSAL(REQ.BODY) Y LE ASIGNA LOS DATOS DEL OPERADOR CREADO COMO USER
router.post("/create-branch-and-operator", validateMiddleware.isAdmin, adminController.createOperatorAndBranch);

// CREA UNA SUCURSAL SIN NINGUN OPERADOR PARA QUE DESPUES SE LO ASIGNES CUANDO LO CREES EN LA PRIMERA RUTA COMO EN EL FIGMA
router.post("/create-branch", validateMiddleware.isAdmin, adminController.createBranchContoller);


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
