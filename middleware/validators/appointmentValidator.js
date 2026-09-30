const { body, query, validationResult, matchedData } = require('express-validator');

const appointmentValidationRules = [
  body('patientId')
    .notEmpty().withMessage('Patient is required')
    .isUUID().withMessage('Patient ID must be a valid UUID'),
  body('appointmentDate')
    .notEmpty().withMessage('Appointment date is required')
    .isISO8601().withMessage('Appointment date must be a valid ISO date'),
  body('reason')
    .notEmpty().withMessage('Reason is required')
    .isLength({ min: 3, max: 255 }).withMessage('Reason must be between 3 and 255 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'cancelled']).withMessage('Status must be pending, confirmed, or cancelled'),
  body('notes')
    .optional()
    .isString().withMessage('Notes must be text'),
];

const appointmentQueryValidationRules = [
  query('date')
    .optional()
    .isISO8601().withMessage('Date must be a valid ISO date'),
  query('status')
    .optional()
    .isIn(['pending', 'confirmed', 'cancelled']).withMessage('Status must be pending, confirmed, or cancelled'),
];

const appointmentStatusValidationRules = [
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['pending', 'confirmed', 'cancelled']).withMessage('Status must be pending, confirmed, or cancelled'),
];

const validateAppointment = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const data = matchedData(req, { includeOptionals: true });
  req.validated = data;
  next();
};

const validateAppointmentQuery = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const data = matchedData(req, { locations: ['query'], includeOptionals: true });
  req.queryValidated = data;
  next();
};

const validateAppointmentStatus = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const data = matchedData(req, { includeOptionals: true });
  req.validated = data;
  next();
};

module.exports = {
  appointmentValidationRules,
  appointmentQueryValidationRules,
  appointmentStatusValidationRules,
  validateAppointment,
  validateAppointmentQuery,
  validateAppointmentStatus,
};
