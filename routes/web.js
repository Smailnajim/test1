const exress = require("express");
const router = exress.Router();
const { patientValidationRules, validate } = require('../middleware/validators/patientValidator');
const authController = require('../controller/authController');


//auth routes
router.post("/register", patientValidationRules, validate, authController.register);

module.exports = router;