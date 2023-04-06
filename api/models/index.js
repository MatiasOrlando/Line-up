/**
 * @openapi
 * components:
 *   schemas:
 *     userRegisterPost:
 *       type: object
 *       properties:
 *         dni:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     userLogIn:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     PasswordUpdate:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         password:
 *           type: string
 *     EmailValidation:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *     createOperator:
 *       type: object
 *       properties:
 *         dni:
 *           type: number
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         phone:
 *           type: number
 *         operator:
 *           type: boolean
 *         location:
 *           type: string
 *     editOperator:
 *       type: object
 *       properties:
 *         dni:
 *           type: number
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         phone:
 *           type: number
 *         operator:
 *           type: boolean
 *     editBranch:
 *       type: object
 *       properties:
 *         closingHour:
 *           type: string
 *         openingHour:
 *           type: string
 *         allowedClients:
 *           type: number
 *     editStatusOfAppointment:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           required: true
 *     CreateBranchWithOperatorNull:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         location:
 *           type: string
 *         openingHour: 
 *           type: string
 *         closingHour: 
 *           type: string
 *         allowedClients: 
 *           type: number
 *     CreateBranch:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         location:
 *           type: string
 *         openingHour: 
 *           type: string
 *         closingHour: 
 *           type: string
 *         allowedClients: 
 *           type: number
 *         user:
 *           type: object
 *           properties:
 *             email: 
 *               type: string
 *             phone:
 *               type: number
 *             operator:
 *               type: boolean
 *             password:
 *               type: string
 *             name:
 *               type: string
 *             dni:
 *               type: number      
 */