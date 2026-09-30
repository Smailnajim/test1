const { body, validationResult, matchedData } = require('express-validator');

const loginRules = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('isPatient').optional().toBoolean().isBoolean().withMessage('isPatient must be boolean'),
];

const validateAuth = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  req.validated = matchedData(req, { includeOptionals: true });
  next();
};

module.exports = {
  loginRules,
  validateAuth,
};
