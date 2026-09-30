const exress = require("express");
const router = exress.Router();
const { patientValidationRules, validate } = require('../middleware/validators/patientValidator');
const authController = require('../controller/authController');
const { loginRules, validateAuth } = require('../middleware/validators/authValidator');
const { authenticate } = require('../middleware/authMiddleware');
const { userValidationRules, validateUser } = require('../middleware/validators/userValidator');
const {
  appointmentValidationRules,
  appointmentQueryValidationRules,
  validateAppointment,
  validateAppointmentQuery,
} = require('../middleware/validators/appointmentValidator');
const { iCan } = require('../middleware/iCan');
const userController = require('../controller/userController');
const appointmentController = require('../controller/appointmentController');

//auth routes
router.post("/register", patientValidationRules, validate, authController.register);
router.post('/users', userValidationRules, validateUser, userController.createUser);
router.post('/auth/login', loginRules, validateAuth, authController.login);
router.get('/auth/me', authenticate, authController.me);

//appointment routes
router.get('/appointments', authenticate, iCan(['admin', 'staff']), appointmentQueryValidationRules, validateAppointmentQuery, appointmentController.getAppointments);
router.post('/appointments', authenticate, iCan(['admin', 'staff']), appointmentValidationRules, validateAppointment, appointmentController.createAppointment);

module.exports = router;