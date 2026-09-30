const { body, validationResult, matchedData } = require('express-validator');

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

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const data = matchedData(req, { includeOptionals: true });
  req.validated = data;
  next();
};

module.exports = {
  patientValidationRules,
  validate,
};
