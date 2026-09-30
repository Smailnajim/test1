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
  appointmentStatusValidationRules,
  validateAppointment,
  validateAppointmentQuery,
  validateAppointmentStatus,
} = require('../middleware/validators/appointmentValidator');
const { iCan } = require('../middleware/iCan');
const userController = require('../controller/userController');
const patientController = require('../controller/patientController');
const appointmentController = require('../controller/appointmentController');

//auth routes
router.post('/register', patientValidationRules, validate, authController.register);
router.post('/auth/login', loginRules, validateAuth, authController.login);
router.get('/auth/me', authenticate, authController.me);

//users routes
router.post('/users', authenticate, iCan(['admin', 'staff']), userValidationRules, validateUser, userController.createUser);

//patients routes
router.post('/patients', authenticate, iCan(['admin', 'staff']), patientValidationRules, validate, patientController.createPatient);

//appointment routes
router.get('/appointments', authenticate, iCan(['admin', 'staff']), appointmentQueryValidationRules, validateAppointmentQuery, appointmentController.getAppointments);
router.post('/appointments', authenticate, iCan(['admin', 'staff']), appointmentValidationRules, validateAppointment, appointmentController.createAppointment);
router.patch('/appointments/:id/status', authenticate, iCan(['admin', 'staff']), appointmentStatusValidationRules, validateAppointmentStatus, appointmentController.updateAppointmentStatus);

module.exports = router;