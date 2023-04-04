const router = require("express").Router();
const { emailConfirmation } = require("../config/emailConfirmation");
const mapUser = require("../config/userMapped");
const { validateToken } = require("../config/token");
const userControllers = require("../controllers/user_controller");

router.post("/register", userControllers.registerUser);
router.get("/all-users", userControllers.getAllUsers);
router.post("/login", userControllers.logIn);
router.get("/:id", userControllers.getSingleUser);
router.put("/new-password-email", userControllers.newPasswordEmail);
router.put("/new-password-profile", userControllers.newPasswordProfile);
router.put("/password-update-email", userControllers.passwordEmailUpdate);
router.get("/email/token", userControllers.validateUserdata);

router.post("/appointmentBooked", async (req, res) => {
  emailConfirmation();
});

module.exports = router;
