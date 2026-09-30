const exress = require("express");
const router = exress.Router();
const { patientValidationRules, validate } = require('../middleware/validators/patientValidator');
const authController = require('../controller/authController');
const { userValidationRules, validateUser } = require('../middleware/validators/userValidator');
const userController = require('../controller/userController');


//auth routes
router.post("/register", patientValidationRules, validate, authController.register);
router.post('/users', userValidationRules, validateUser, userController.createUser);

module.exports = router;