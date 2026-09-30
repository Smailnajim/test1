const { body, validationResult, matchedData } = require('express-validator');

const userValidationRules = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['admin', 'staff']).withMessage('Role must be admin or staff'),
  body('fullName').notEmpty().withMessage('Full name is required'),
];

const validateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const data = matchedData(req, { includeOptionals: true });
  req.validated = data;
  next();
};

module.exports = {
  userValidationRules,
  validateUser,
};
