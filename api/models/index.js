/**
 * @openapi
 * components:
 *   schemas:
 *     CancelAppoinment:
 *       type: object
 *       properties:
 *         cancelReason: 
 *           type: string
 *     EditAppoinment:
 *       type: object
 *       properties:
 *         idApp: 
 *           type: string
 *         branch:
 *           type: string
 *         email:
 *           type: string
 *         phoneNew:
 *           type: number
 *         day: 
 *          type: string
 *         time: 
 *          type: string
 *     GetHoursAvailable:
 *       type: object
 *       properties:
 *         day:
 *           type: string
 *         branch:
 *           type: string
 *     GetdayAvailable:
 *       type: object
 *       properties:
 *         days:
 *           type: array
 *           items: 
 *              type: string
 *         branch:
 *           type: string
 *         email:
 *           type: string
 *     AddnewAppoinment:
 *       type: object
 *       properties:
 *         branch:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phoneNew:
 *           type: number
 *         day: 
 *          type: string
 *         time: 
 *          type: string
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