const router = require("express").Router();
const adminController = require("../controllers/admin_controller");
const validateMiddleware = require("../middleWare/validateMiddleware");
const Branch = require("../models/branch");
const User = require("../models/user");

/**
 * @openapi
 * /api/admin/create-branch/token:
 *   post:
 *     tags:
 *       - branches
 *     summary: Create a new branch in the database with user null
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: token
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
 *         description: (NotFound) No se encontró información
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
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 *       NotFound:
 *         description: (NotFound) No se encontró información
 */

/**
 * @openapi
 * /api/admin/create-operator/token:
 *   post:
 *     tags:
 *       - operators
 *     summary: Create a new operator and assign them to a branch.
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
 *         description: (NotFound) No se encontró información
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       BadRequest:
 *         description: (Bad Request) Key data is missing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       ServerError:
 *         description: Error en servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       NotFound:
 *         description: (NotFound) No se encontró información
 *       Error:
 *         type: object
 *         properties:
 *           message:
 *             type: string
 *         required:
 *           - message
 */

/**
 * @openapi
 * /api/admin/edit-operator/{branchId}/token:
 *   put:
 *     tags:
 *       - operators - branches
 *     summary: Change the operator of a branch.
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
 *         description: (NotFound) No se encontró información
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
 * /api/admin/edit-branch-info/{branchId}/token:
 *   put:
 *     tags:
 *       - branches
 *     summary: Edit branch Closing-Hour, Opening-Hour and AllowedClients.
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
 *         description: (NotFound) No se encontró información
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
 * /api/admin/delete-user/{userId}/token:
 *   delete:
 *     tags:
 *       - branch
 *     summary: Delete user from the database.
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
 *         description: (NotFound) No se encontró información
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
 * /api/admin/delete-branch/{branchId}/token:
 *   delete:
 *     tags:
 *       - branches
 *     summary: Delete a branch from the database.
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
 *         description: (NotFound) No se encontró información
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
 * /api/admin/get-all-users/{number}/token:
 *   get:
 *     tags:
 *       - users
 *     summary: Get all users based on the number of page requested.
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
 *         description: (NotFound) No se encontró información
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
 * /api/admin/get-all-branches/{number}/token:
 *   get:
 *     tags:
 *       - branches
 *     summary: Get all the branches based on the number of page requested.
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
 *         description: (NotFound) No se encontró información
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
 * /api/admin/get-all-operators/{number}/token:
 *   get:
 *     tags:
 *       - operators
 *     summary: Get all the operators based on the number of page requested.
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
 *         description: (NotFound) No se encontró información
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
 *         description: (Unauthorized) User Unauthorized
 *       NotFound:
 *         description: (NotFound) No se encontró información
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 */

// admin id
// CREA OPERADOR(REQ.BODY) Y LE PISA EL BRANCH.USER(VACIO) CON LOS DATOS DEL NUEVO OPERADOR, ASIGNANDOLE UN OPERADOR A LA SUCURSAL(hay que pasarle req.boy.location) Y VICE VERSA
router.post(
  "/create-operator/token",
  validateMiddleware.isAdmin,
  adminController.create_operator_post
);

// CREA UN OPERADOR(REQ.BODY.USER) Y CREA UNA SUCURSAL(REQ.BODY) Y LE ASIGNA LOS DATOS DEL OPERADOR CREADO COMO USER
router.post(
  "/create-branch-and-operator/token",
  validateMiddleware.isAdmin,
  adminController.createOperatorAndBranch
);

// CREA UNA SUCURSAL SIN NINGUN OPERADOR PARA QUE DESPUES SE LO ASIGNES CUANDO LO CREES EN LA PRIMERA RUTA COMO EN EL FIGMA
router.post(
  "/create-branch/token",
  validateMiddleware.isAdmin,
  adminController.createBranchContoller
);

// MODIFICA EL OPERADOR DE UNA SUCURSAL, LA BRANCH LA ENCUENTRA POR(req.params.branchId) y le llega por body todos los datos del nuevo operador para crear
//const body = { email: req.body.email, phone: req.body.phone, operator: req.body.operator, name: req.body.name, password: req.body.password }
router.put(
  "/edit-operator/:branchId/token",
  validateMiddleware.isAdmin,
  adminController.edit_operator_put
);

// MODIFICA LA INFORMACION DE LA BRANCH(NO EL OPERADOR),  const { hourRange, allowedClients } = req.body, const { branchId } = req.params
// LA SUCURSAL LA ENCUETRA POR branchId y le modifica el hourRange o u y AllowedClients
router.put(
  "/edit-branch-info/:branchId/token",
  validateMiddleware.isAdmin,
  adminController.edit_branch_info
);

// BORRA UNA SUCURSAL QUE SE LE PASE POR PARAMS  const { branchId } = req.params
router.delete(
  "/delete-branch/:branchId/token",
  validateMiddleware.isAdmin,
  adminController.delete_branch_delete
);

// BORRA UN USUARIO QUE SE LE PASE POR PARAMS  const { userId } = req.params
router.delete(
  "/delete-user/:userId/token",
  validateMiddleware.isAdmin,
  adminController.delete_user_delete
);

// TRAE TODOS LOS USUARIOS DEL LA PAGINA QUE LE PASES COMO PARAMS, SI EL NUMERO ES 1 TRAE LOS USUARIOS DEL 1 AL 7, SI EL NUMERO ES 2 TRAE LOS USUARIOS DEL 7 AL 14
router.get(
  "/get-all-users/:number/token",
  validateMiddleware.isAdmin,
  adminController.get_all_users_get
);

// TRAE TODOS LOS OPERADORES DE LA PAGINA QUE LE PASES COMO PARAMS, SI EL NUMERO ES 1 TRAE LOS OPERADORES DEL 1 AL 7, SI EL NUMERO ES 2 TRAE LOS OPERADORES DEL 7 AL 14
router.get(
  "/get-all-operators/:number/token",
  validateMiddleware.isAdmin,
  adminController.get_all_operators_get
);

// TRAE TODOS LOS SUCURSALES DE LA PAGINA QUE LE PASES COMO PARAMS, SI EL NUMERO ES 1 TRAE LAS SUCURSALES DEL 1 AL 7, SI EL NUMERO ES 2 TRAE LAS SUCURSALES DEL 7 AL 14

router.get(
  "/get-all-branches/:number/token",
  validateMiddleware.isAdmin,
  adminController.get_all_branches_get
);

router.get(
  "/get-one-operator/:number/token",
  validateMiddleware.isAdmin,
  async (req, res) => {
    let id = req.params.number;
    let opFind = await User.findById(id);
    let suc = await Branch.findOne({ "user.email": opFind.email });
    let idLocation = suc._id.toString();
    let nameLocation = suc?.location || "";
    res.send({
      user: opFind,
      branchName: nameLocation,
      idLocation: idLocation,
    });
  }
);

router.get(
  "/get-enabled-branches/token",
  validateMiddleware.isAdmin,
  adminController.get_all_branches_enabled_get
);

router.get(
  "/get-one-branch/:id/token",
  validateMiddleware.isAdmin,
  adminController.get_one_branche_get
);

router.put(
  "/edit-one-operator/:idUser/token",
  validateMiddleware.isAdmin,
  adminController.edit_one_operator
);

module.exports = router;
