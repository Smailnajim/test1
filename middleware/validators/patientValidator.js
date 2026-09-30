const { body, query, param, validationResult, matchedData } = require('express-validator');

const patientValidationRules = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('phone')
    .notEmpty().withMessage('Phone is required')
    .matches(/^\+?[1-9]\d{1,14}$/).withMessage('Invalid phone number. Use international format, e.g. +1234567890'),
  body('CIN').notEmpty().withMessage('CIN is required'),
  body('birthDate')
    .notEmpty().withMessage('Birth date is required')
    .isISO8601().withMessage('Birth date must be a valid date (YYYY-MM-DD)'),
  body('address').optional().isString().withMessage('Address must be text'),
];

const updatePatientValidationRules = [
  body('email').optional().isEmail().withMessage('Invalid email'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('fullName').optional().notEmpty().withMessage('Full name is required'),
  body('phone')
    .optional()
    .notEmpty().withMessage('Phone is required')
    .matches(/^\+?[1-9]\d{1,14}$/).withMessage('Invalid phone number. Use international format, e.g. +1234567890'),
  body('CIN').optional().notEmpty().withMessage('CIN is required'),
  body('birthDate')
    .optional()
    .notEmpty().withMessage('Birth date is required')
    .isISO8601().withMessage('Birth date must be a valid date (YYYY-MM-DD)'),
  body('address').optional().isString().withMessage('Address must be text'),
];

const patientIdValidationRules = [
  param('id').isUUID().withMessage('Patient ID must be a valid UUID'),
];

const patientQueryValidationRules = [
  query('search')
    .optional()
    .isString().withMessage('Search must be text')
    .trim(),
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be an integer greater than 0')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
    .toInt(),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const data = matchedData(req, { includeOptionals: true });
  req.validated = data;
  next();
};

const validatePatientQuery = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const data = matchedData(req, { locations: ['query'], includeOptionals: true });
  req.queryValidated = data;
  next();
};

const validatePatientParam = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const data = matchedData(req, { locations: ['params'], includeOptionals: true });
  req.paramsValidated = data;
  next();
};

module.exports = {
  patientValidationRules,
  updatePatientValidationRules,
  patientIdValidationRules,
  patientQueryValidationRules,
  validate,
  validatePatientQuery,
  validatePatientParam,
};
