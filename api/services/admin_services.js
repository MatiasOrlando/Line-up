const User = require("../models/user");
const Branch = require("../models/branch");
const validateMiddleware = require("../config/validateMiddleware").isAdmin;


const createBranch = async (branchInfo, userInfo) => {
    try {

        if (typeof (userInfo.phone) !== "number" || typeof (userInfo.email) !== "string" || typeof (userInfo.operator) !== "boolean" || typeof (userInfo.name) !== "string" || typeof (userInfo.password) !== "string") {
            return res.status(400).send({ message: "invalid type of body" })
        }


        const operador = await User.create(userInfo);
        const { id, email, phone, operator } = operador;

        const createdBranch = await Branch.create({
            name: branchInfo.name, location: branchInfo.location, hourRange: branchInfo.hourRange, allowedClients: branchInfo.allowedClients,
            user: { id, email, phone, operator },
        });
        return (createdBranch);
    } catch (err) {
        return({message: "failed to pass neccesary information"})
    }
}




module.exports = { createBranch }